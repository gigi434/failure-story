import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Firebase Admin SDKの初期化
admin.initializeApp();

/* カスタムクレームを使用することで、新規登録ユーザー作成時にHasuraエンドポイントに対して必要な認証情報を作成し、JWTトークンを埋め込む */
export const setCustomClaims = functions.auth.user().onCreate(async (user) => {
  // 新規登録ユーザー作成時に与える権限を定義する
  const customClaims = {
    "http://hasura.io/jwt/claims": {
      // 権限に対して指定がない場合のデフォルトで設定される権限のこと
      "x-hasura-default-role": "user",
      // hasuraに存在する権限の一覧のこと
      "x-hasura-allowed-roles": ["user"],
      // 新規ユーザーアカウントのuuidのこと
      "x-hasura-user-id": user.uid,
    },
  };
  // 新規登録者ユーザーからhasuraへのリクエストにJWTトークンを埋め込む
  try {
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    // カスタムクレームをユーザー情報に付与したことをイベントにしてアプリケーション側でハンドルするための通知を設定する
    // 具体的には、firestoreにユーザーのメタ情報を書き込み、ReactのonSnapShot機能を用いて更新がある場合フェッチする。
    // これにより、Firebaseでの認証とアプリケーションとの同期を可能にする
    await admin.firestore().collection("user_meta").doc(user.uid).create({
      // Firestoreのタイムスタンプを書き込む
      refreshTime: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }
});
