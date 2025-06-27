import { useState } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './AuthForm.scss';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

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
      <h2>{isRegister ? 'Registration' : 'Login'}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? "new-password" : "current-password"}
        />
        <button type="submit">{isRegister ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button className="google-auth-btn" onClick={handleGoogle}>Sign in with Google</button>
      <p
        className="toggle-auth-mode"
        style={{ cursor: 'pointer', textAlign: 'center', marginTop: '1rem', color: '#5097f7' }}
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </p>
      {error && <p style={{ color: 'salmon', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}