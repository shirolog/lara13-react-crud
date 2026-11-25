# Laravel API + React 投稿アプリ

Laravel APIとReactを使用して作成した投稿アプリです。

## 使用技術

- PHP 8.5
- Laravel 13
- React
- Vite
- MariaDB
- JavaScript
- CSS

## プロジェクト構成

```text
react-laravel-project/
├── laravel-api/   # Laravel API
└── react-app/     # Reactフロントエンド
```

## 主な機能

- 投稿一覧表示
- 投稿登録
- 投稿編集
- 投稿削除
- 削除前の確認ダイアログ
- タイトル検索（部分一致）
- 登録・更新・削除後のメッセージ表示

## API一覧

| HTTPメソッド | エンドポイント | 処理 |
|---|---|---|
| GET | /api/posts | 投稿一覧・検索 |
| POST | /api/posts | 投稿登録 |
| GET | /api/posts/{id} | 投稿詳細 |
| PUT/PATCH | /api/posts/{id} | 投稿更新 |
| DELETE | /api/posts/{id} | 投稿削除 |

### タイトル検索

検索キーワードをクエリパラメータで送信します。

```text
GET /api/posts?keyword=Laravel
```

タイトルに検索キーワードを含む投稿を取得します。検索キーワードが空の場合は全投稿を取得します。

## セットアップ

### 1. Laravel API

```bash
cd laravel-api
composer install
```

`.env.example` を `.env` にコピーし、MariaDBの接続情報を設定します。

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

Laravel APIは `http://127.0.0.1:8000` で起動します。

### 2. React

別のターミナルで実行します。

```bash
cd react-app
npm install
npm run dev
```

Reactは `http://localhost:5173` で起動します。

## 学習内容

- Laravel APIによるCRUD処理
- Eloquent ORMによるデータ操作
- ReactのuseState・useEffect
- ReactのfetchによるAPI通信
- Reactのmap()・filter()による一覧操作
- Laravel APIとReactを分離したアプリケーション構成
