import { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig'; 
import { ref, onValue } from 'firebase/database';
import './Leaderboard.scss';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

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
      <h3>Leaderboard</h3>
      <ul>
        {leaders.map((leader, index) => (
          <li key={index}>
            <strong>{index + 1}. {leader.username}</strong>: {leader.score} points
          </li>
        ))}
      </ul>
      {userPosition && (
        <div className="user-position">
          <p>Your position: {userPosition}</p>
        </div>
      )}
    </div>
  );
}