import { FaHome, FaSearch, FaPlusCircle, FaHeart, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // For navigation links
import './NavMenu.scss';
import { useContext } from 'react';
import { LangContext } from './App';

export default function NavMenu() {
  const { lang } = useContext(LangContext);
  const translations = {
    eng: { home: 'Home', leaderboard: 'Leaderboard', account: 'Account' },
    ru: { home: 'Главная', leaderboard: 'Таблица', account: 'Аккаунт' },
    ua: { home: 'Головна', leaderboard: 'Таблиця', account: 'Акаунт' },
  };
  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">
            <FaHome className="nav-icon" />
            <span className="nav-text">{translations[lang]?.home}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/leaderboard">
            <FaSearch className="nav-icon" />
            <span className="nav-text">{translations[lang]?.leaderboard}</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/account">
            <FaUserAlt className="nav-icon" />
            <span className="nav-text">{translations[lang]?.account}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}