// firebaseを使用するために初期化する
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebaseのアプリインスタンスが存在しない場合、初期情報を渡して初期化し、存在する場合にはデフォルトのアプリインスタンスを取得する
!firebase.app.length
  ? firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
    })
  : firebase.app()

export default firebase
