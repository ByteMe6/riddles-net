import { useEffect, useState, useContext } from 'react';
import { auth, db } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import './Leaderboard.scss';
import { LangContext } from './App';

const translations = {
  eng: {
    leaderboard: 'Leaderboard',
    yourPosition: 'Your position:',
    points: 'points',
  },
  ru: {
    leaderboard: 'Таблица лидеров',
    yourPosition: 'Ваша позиция:',
    points: 'очков',
  },
  ua: {
    leaderboard: 'Таблиця лідерів',
    yourPosition: 'Ваша позиція:',
    points: 'балів',
  },
};

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const { lang: contextLang } = useContext(LangContext);
  const lang = contextLang || 'eng';

  useEffect(() => {
    const leaderboardRef = ref(db, 'leaderboard');
    const unsub = onValue(leaderboardRef, (snapshot) => {
      const data = snapshot.val() || {};
      const sorted = Object.values(data)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      setLeaders(sorted);

      const user = data[auth.currentUser.uid];
      if (user) {
        const position = sorted.findIndex((leader) => leader.username === user.username);
        setUserPosition(position + 1);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="leaderboard-container">
      <h3>{translations[lang].leaderboard}</h3>
      <ul>
        {leaders.map((leader, index) => (
          <li key={index}>
            <strong>{index + 1}. {leader.username}</strong>: {leader.score} {translations[lang].points}
          </li>
        ))}
      </ul>
      {userPosition && (
        <div className="user-position">
          <p>{translations[lang].yourPosition} {userPosition}</p>
        </div>
      )}
    </div>
  );
}