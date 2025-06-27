import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './NavMenu';
import RiddleChat from './RiddleChat';
import Leaderboard from './Leaderboard';
import Account from './Account';
import AuthWrapper from './AuthWrapper'; // new wrapper
import { createContext, useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig';
import { ref, get } from 'firebase/database';

export const LangContext = createContext({ lang: 'eng', setLang: () => {} });

function LanguageProvider({ children }) {
  const [lang, setLang] = useState('eng');
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        const data = snapshot.val();
        if (data && data.lang) setLang(data.lang);
      });
    }
  }, []);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthWrapper>
          <Routes>
            <Route path="/" element={<RiddleChat />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <NavMenu />
        </AuthWrapper>
      </LanguageProvider>
    </Router>
  );
}