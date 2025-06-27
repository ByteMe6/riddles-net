import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; 

export default function LogoutButton({ lang = 'eng' }) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error('Error signing out: ', error.message);
      });
  };

  const translations = {
    eng: 'Logout',
    ru: 'Выйти',
    ua: 'Вийти',
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      {translations[lang] || translations.eng}
    </button>
  );
}