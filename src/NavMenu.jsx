import { FaHome, FaSearch, FaPlusCircle, FaHeart, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // For navigation links
import './NavMenu.scss';

export default function NavMenu() {
  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">
            <FaHome className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/leaderboard">
            <FaSearch className="nav-icon" />
            <span className="nav-text">Leaderboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account">
            <FaUserAlt className="nav-icon" />
            <span className="nav-text">Account</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}