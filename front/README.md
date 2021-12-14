# sugit

### npm scripts

| command           | subject                                                              |
| ----------------- | -------------------------------------------------------------------- |
| `npm ci`          | `npm install`の代替。新しくパッケージを入れるときだけ`install`を使う |
| `npm run dev`     | 開発サーバー立ち上げ                                                 |
| `npm run build`   | ビルド                                                               |
| `npm run preview` | `build`したデータをローカルで見る                                    |
| `npm run prepare` | 実行時に必要な情報を収集。勝手に動くはず。                           |
| `npm run format`  | コードの整形                                                         |
| `npm run check`   | lint と型チェック                                                    |

### Directory

[SPA Component の推しディレクトリ構成について語る - よしこ](https://zenn.dev/yoshiko/articles/99f8047555f700)

| dir                  | contents                                                  | memo                                                          |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| src/components/page  | 1 つのページを表す Component                              | 使わないかも                                                  |
| src/components/model | model に関心を持つ Component                              | 「このアプリは何を扱っている?」を知っている Component         |
| src/components/ui    | model に関心を持たない Component                          | 「見た目さえ良ければ外部ライブラリでもよくない?」な Component |
| src/components/hook  | [フック](https://ja.reactjs.org/docs/hooks-overview.html) |                                                               |
| src/components/utils | 関数類                                                    |                                                               |
| src/components/api   | API と通信する関数                                        | 少なくとも API の URL を知っているものはすべてここへ          |
