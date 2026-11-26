import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [editPostsIndex, setEditPostsIndex] = useState(null);
  const [search, setSearch] = useState("");


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    fetch(
      `http://127.0.0.1:8000/api/posts?keyword=${encodeURIComponent(search)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }

  function handleReset() {
    setSearch("");
    fetch("http://127.0.0.1:8000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    if (editPostsIndex === null) {
      fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newSetPosts = [...posts, data.post];

          setPosts(newSetPosts);
          setTitle("");
          setBody("");
          setMessage("投稿を投稿しました!");
        });
    } else {
      fetch(`http://127.0.0.1:8000/api/posts/${editPostsIndex}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newSetPosts = posts.map((post) => {
            if (post.id === editPostsIndex) {
              return data.post;
            }
            return post;
          });

          setPosts(newSetPosts);
          setTitle("");
          setBody("");
          setEditPostsIndex(null);
          setMessage("投稿を更新しました!");
        });
    }
  }

  function deleteButton(postId) {
    fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
      method: "DELETE",
    });

    const newSetPosts = posts.filter((post) => post.id !== postId);

    setPosts(newSetPosts);
    setMessage("投稿を削除しました!");
  }

  function editButton(post) {
    setEditPostsIndex(post.id);
    setTitle(post.title);
    setBody(post.body);
  }

  return (
    <>
      <h1>Laravel API × React</h1>

      <p className="subtitle">POST / GET 投稿アプリ</p>

      <div className="post-form">
        <h2>新規投稿</h2>
        {message && (
          <div className="success-message">
            <p>{message}</p>
            <button
              type="button"
              className="close-btn"
              onClick={() => setMessage("")}
            >
              x
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={body}
            placeholder="本文"
            onChange={(e) => setBody(e.target.value)}
          />
          {editPostsIndex === null ? (
            <button type="submit" className="submit-btn">
              投稿する
            </button>
          ) : (
            <button type="submit" className="update-btn">
              更新する
            </button>
          )}
        </form>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="タイトル名で検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">検索</button>

        <button type="button" onClick={handleReset}>
          検索解除
        </button>
      </form>

      <div className="post-list">
        <h2>投稿一覧</h2>

        {posts.map((post) => (
          <div className="post-item" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-actions">
              <button
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("本当に削除しますか？"))
                    deleteButton(post.id);
                }}
              >
                削除
              </button>
              <button className="edit-btn" onClick={() => editButton(post)}>
                編集
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
