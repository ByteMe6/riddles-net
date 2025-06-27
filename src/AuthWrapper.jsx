import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import AuthForm from './AuthForm';

export default function AuthWrapper({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>;

  return user ? children : <AuthForm />;
}