import { useState, useContext } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './AuthForm.scss';
import { LangContext } from './App';

const translations = {
  eng: {
    registration: 'Registration',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    signInWithGoogle: 'Sign in with Google',
    alreadyHave: 'Already have an account? Sign In',
    dontHave: "Don't have an account? Sign Up",
  },
  ru: {
    registration: 'Регистрация',
    login: 'Вход',
    email: 'Почта',
    password: 'Пароль',
    signUp: 'Зарегистрироваться',
    signIn: 'Войти',
    signInWithGoogle: 'Войти через Google',
    alreadyHave: 'Уже есть аккаунт? Войти',
    dontHave: 'Нет аккаунта? Зарегистрироваться',
  },
  ua: {
    registration: 'Реєстрація',
    login: 'Вхід',
    email: 'Пошта',
    password: 'Пароль',
    signUp: 'Зареєструватися',
    signIn: 'Увійти',
    signInWithGoogle: 'Увійти через Google',
    alreadyHave: 'Вже є акаунт? Увійти',
    dontHave: 'Немає акаунта? Зареєструватися',
  },
};

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const { lang } = useContext(LangContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{isRegister ? translations[lang].registration : translations[lang].login}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={translations[lang].email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder={translations[lang].password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? "new-password" : "current-password"}
        />
        <button type="submit">{isRegister ? translations[lang].signUp : translations[lang].signIn}</button>
      </form>
      <button className="google-auth-btn" onClick={handleGoogle}>{translations[lang].signInWithGoogle}</button>
      <p
        className="toggle-auth-mode"
        style={{ cursor: 'pointer', textAlign: 'center', marginTop: '1rem', color: '#5097f7' }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? translations[lang].alreadyHave : translations[lang].dontHave}
      </p>
      {error && <p style={{ color: 'salmon', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}