import { useState, useEffect } from 'react';
import { auth, db } from './firebaseConfig'; // Ensure auth is imported
import { ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

import './Account.scss';

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      get(userRef).then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
        }
      });

      const leaderboardRef = ref(db, 'leaderboard');
      get(leaderboardRef).then((snapshot) => {
        const data = snapshot.val();
        const sorted = Object.values(data).sort((a, b) => b.score - a.score);
        const position = sorted.findIndex((leader) => leader.username === auth.currentUser.displayName);
        setUserPosition(position + 1); // Position is 1-based
      });
    }
  }, []);

  return (
    <div className="account-container">
      {userData ? (
        <>
          <h2 className="account-title">Account Information</h2>
          <div className="account-details">
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {auth.currentUser.email}</p>
            <p><strong>Score:</strong> {userData.score}</p>
            {userPosition && (
              <p><strong>Your position:</strong> {userPosition}</p>
          )}
          </div>

          <LogoutButton />
          <div className="links-container">
            <Link to="/leaderboard" className="link">Leaderboard</Link>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}