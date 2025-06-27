import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; 

export default function LogoutButton() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Error signing out: ', error.message);
      });
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}