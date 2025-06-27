import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './NavMenu';
import RiddleChat from './RiddleChat';
import Leaderboard from './Leaderboard';
import Account from './Account';
import AuthWrapper from './AuthWrapper'; // new wrapper

export default function App() {
  return (
    <Router>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<RiddleChat />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <NavMenu />
      </AuthWrapper>
    </Router>
  );
}