import { useState, useEffect, useContext, useRef } from 'react';
import { auth, db } from './firebaseConfig'; // Ensure auth is imported
import { ref, get, set, update } from 'firebase/database';
import { Link } from 'react-router-dom';
import { updateProfile, updatePassword } from 'firebase/auth';
import { LangContext } from './App';
import LogoutButton from './LogoutButton';
import { FaChevronDown } from 'react-icons/fa';
import AccountModal from './AccountModal.jsx';
import CustomInput from './CustomInput.jsx';
import './Account.scss';
import './AccountModal.scss';

const translations = {
  eng: {
    accountInfo: 'Account Information',
    username: 'Username',
    email: 'Email',
    score: 'Score',
    yourPosition: 'Your position',
    newUsername: 'New username:',
    changeUsername: 'Change username',
    changePassword: 'Change password',
    newPassword: 'New password:',
    language: 'Language:',
    leaderboard: 'Leaderboard',
    loading: 'Loading...',
    passwordChanged: 'Password successfully updated!',
    usernameChanged: 'Username successfully updated!',
    langChanged: 'Language successfully changed!',
    error: 'Error',
    close: 'Close',
    save: 'Save',
  },
  ru: {
    accountInfo: 'Информация об аккаунте',
    username: 'Имя пользователя',
    email: 'Почта',
    score: 'Очки',
    yourPosition: 'Ваша позиция',
    newUsername: 'Новое имя пользователя:',
    changeUsername: 'Сменить имя',
    changePassword: 'Сменить пароль',
    newPassword: 'Новый пароль:',
    language: 'Язык:',
    leaderboard: 'Таблица лидеров',
    loading: 'Загрузка...',
    passwordChanged: 'Пароль успешно обновлён!',
    usernameChanged: 'Имя пользователя успешно обновлено!',
    langChanged: 'Язык успешно изменён!',
    error: 'Ошибка',
    close: 'Закрыть',
    save: 'Сохранить',
  },
  ua: {
    accountInfo: 'Інформація про акаунт',
    username: 'Імʼя користувача',
    email: 'Пошта',
    score: 'Бали',
    yourPosition: 'Ваша позиція',
    newUsername: 'Нове імʼя користувача:',
    changeUsername: 'Змінити імʼя',
    changePassword: 'Змінити пароль',
    newPassword: 'Новий пароль:',
    language: 'Мова:',
    leaderboard: 'Таблиця лідерів',
    loading: 'Завантаження...',
    passwordChanged: 'Пароль успішно оновлено!',
    usernameChanged: 'Імʼя користувача успішно оновлено!',
    langChanged: 'Мову успішно змінено!',
    error: 'Помилка',
    close: 'Закрити',
    save: 'Зберегти',
  },
};

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [lang, setLang] = useState('eng');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState('password'); // 'password' | 'username'
  const { lang: contextLang, setLang: setContextLang } = useContext(LangContext);

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      get(userRef).then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUserData(data);
          setLang(data.lang || 'eng');
          setContextLang(data.lang || 'eng');
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

  // Сброс username только при открытии модалки смены username
  useEffect(() => {
    if (showModal && modalTab === 'username' && userData) {
      setUsername(userData.username || '');
    }
  }, [showModal, modalTab]);

  // Сброс пароля только при открытии модалки смены пароля
  useEffect(() => {
    if (showModal && modalTab === 'password') {
      setNewPassword('');
    }
  }, [showModal, modalTab]);

  // Функция смены имени пользователя
  const handleUsernameChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await updateProfile(auth.currentUser, { displayName: username });
      await update(ref(db, `users/${auth.currentUser.uid}`), { username });
      await update(ref(db, `leaderboard/${auth.currentUser.uid}`), { username });
      setMessage(translations[lang].usernameChanged);
      setShowModal(false);
    } catch (err) {
      setError(translations[lang].error + ': ' + err.message);
    }
  };

  // Функция смены пароля
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await updatePassword(auth.currentUser, newPassword);
      setMessage('Пароль успешно обновлён!');
      setNewPassword('');
    } catch (err) {
      setError('Ошибка при смене пароля: ' + err.message);
    }
  };

  // Функция смены языка
  const handleLangChange = async (newLang) => {
    setLang(newLang);
    setContextLang(newLang);
    setMessage('');
    setError('');
    try {
      await update(ref(db, `users/${auth.currentUser.uid}`), { lang: newLang });
      setMessage(translations[newLang].langChanged);
    } catch (err) {
      setError(translations[newLang].error + ': ' + err.message);
    }
  };

  // Кастомный select
  function CustomSelect({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const selectRef = useRef(null);
    // Закрытие по клику вне
    useEffect(() => {
      if (!open) return;
      function handleClick(e) {
        if (selectRef.current && !selectRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);
    const handleSelect = (val) => {
      onChange(val);
      setOpen(false);
    };
    return (
      <div className="custom-select" ref={selectRef}>
        <div className="custom-select-selected" onClick={() => setOpen((o) => !o)}>
          {options.find(o => o.value === value)?.label}
          <FaChevronDown className={`select-arrow${open ? ' open' : ''}`} />
        </div>
        {open && (
          <div className="custom-select-options">
            {options.map(opt => (
              <div key={opt.value} className="custom-select-option" onClick={() => handleSelect(opt.value)}>
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="account-container">
      {userData ? (
        <>
          <h2 className="account-title">{translations[lang].accountInfo}</h2>
          <div className="account-details">
            <p><strong>{translations[lang].username}:</strong> {userData.username}</p>
            <p><strong>{translations[lang].email}:</strong> {auth.currentUser.email}</p>
            <p><strong>{translations[lang].score}:</strong> {userData.score}</p>
            {userPosition && (
              <p><strong>{translations[lang].yourPosition}:</strong> {userPosition}</p>
            )}
            <button className="modal-save-btn" onClick={() => { setShowModal(true); setModalTab('username'); }} style={{ marginTop: '1.5rem' }}>{translations[lang].changeUsername}</button>
            <button className="modal-save-btn" onClick={() => { setShowModal(true); setModalTab('password'); }} style={{ marginLeft: 12 }}>{translations[lang].changePassword}</button>
            <div style={{ marginTop: '1rem' }}>
              <label>
                {translations[lang].language}
                <CustomSelect
                  value={lang}
                  onChange={handleLangChange}
                  options={[
                    { value: 'eng', label: 'English' },
                    { value: 'ua', label: 'Українська' },
                    { value: 'ru', label: 'Русский' },
                  ]}
                />
              </label>
            </div>
            {message && <p style={{ color: 'lightgreen', marginTop: 10 }}>{message}</p>}
            {error && <p style={{ color: 'salmon', marginTop: 10 }}>{error}</p>}
          </div>
          <LogoutButton lang={lang} />
          {showModal && (
            <AccountModal isOpen={true} onClose={() => setShowModal(false)} title={modalTab === 'username' ? translations[lang].changeUsername : translations[lang].changePassword} closeLabel={translations[lang].close}>
              {modalTab === 'username' ? (
                <form onSubmit={handleUsernameChange}>
                  <label>{translations[lang].newUsername}
                    <CustomInput
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      style={{ marginTop: 8, marginBottom: 16, maxWidth: '100%' }}
                    />
                  </label>
                  <button className="modal-save-btn" type="submit">{translations[lang].save}</button>
                </form>
              ) : (
                <form onSubmit={handlePasswordChange}>
                  <label>{translations[lang].newPassword}
                    <CustomInput
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      style={{ marginTop: 8, marginBottom: 16, maxWidth: '100%' }}
                    />
                  </label>
                  <button className="modal-save-btn" type="submit">{translations[lang].save}</button>
                </form>
              )}
            </AccountModal>
          )}
        </>
      ) : (
        <p>{translations[lang].loading}</p>
      )}
    </div>
  );
}