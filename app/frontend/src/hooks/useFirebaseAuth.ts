import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import Cookie from 'universal-cookie'
import firebase from '../../firebaseConfig'
import { unSubMeta } from './useUserChanged'

/**
 * ユーザーを認証する際、ユーザー名とEメールをFirebaseに送信するためのカスタムフック
 * @params none
 * @returns email ユーザーのEメールアドレス
 * @returns password ユーザーのパスワード
 * @returns emailChange ユーザーがEmailを入力した際に値を反映する関数オブジェクト
 * @returns passwordChange ユーザーがパスワードを入力した際に値を反映する関数オブジェクト
 * @returns resetInput ユーザーの新規登録や変更を行った際に値を初期化する関数オブジェクト
 * @returns loginUser FibaseSDKを用いてログインを行うための関数オブジェクト
 * @returns logoutUser FibaseSDKを用いてログアウトを行うための関数オブジェクト
 * @returns signupUser FibaseSDKを用いてサインアップを行うための関数オブジェクト
 */
export const useFirebaseAuth = () => {
  const cookie = new Cookie()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /**
   * ユーザーがEmailを入力した際に値を反映するイベントハンドラー
   */
  const emailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  /**
   * ユーザーがpasswordを入力した際に値を反映するイベントハンドラー
   */
  const passwordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  /**
   * Emailとpasswordの値を初期化する関数オブジェクト
   */
  const resetInput = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])

  /**
   * Submitボタンを押した際に呼び出されるサインインを行う関数オブジェクト
   * @params e Submitボタンに入力されたイベントオブジェクト
   * @returns none
   */
  const loginUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // Firebaseのログインメソッドを実行する
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message)
        }
      }
      // ログイン実行後、emailとpasswordの値を初期化するs
      resetInput()
    },
    [resetInput, email, password]
  )
  const logoutUser = useCallback(async () => {
    // もしクリーンアップ関数が存在しているのであればサブスクリプションがあるため停止する
    if (unSubMeta) {
      unSubMeta()
    }
    await firebase.auth().signOut()
    cookie.remove('token')
  }, [])
  /**
   * Submitボタンを押した際に呼び出されるサインアップを行う関数オブジェクト
   * @params e Submitボタンに入力されたイベントオブジェクト
   * @returns none
   */
  const signupUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // Firebaseのサインアップメソッドを実行する
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message)
        }
      }
      // ログイン実行後、emailとpasswordの値を初期化する
      resetInput()
    },
    [resetInput, email, password]
  )

  return {
    email,
    password,
    emailChange,
    passwordChange,
    resetInput,
    loginUser,
    logoutUser,
    signupUser,
  }
}
