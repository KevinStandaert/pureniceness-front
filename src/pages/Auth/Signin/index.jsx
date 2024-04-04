/* eslint-disable react/no-unescaped-entities */
import './index.css';

import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/userContext';
import checkAdminRole from '../../../services/auth/checkAdmin';
import checkConnected from '../../../services/auth/checkConnected';

function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  const { isConnected, setIsConnected } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const postAuth = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/auth/signin`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { error: data.error };
      }
      localStorage.setItem('authApiToken', data.token);
      setIsAdmin(checkAdminRole());
      setIsConnected(checkConnected());
      return { redirectTo: '/' };
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authApiToken');
    if (token) {
      navigate('/', { state: { from: location }, replace: true });
    }
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await postAuth();
    if (result.redirectTo) {
      toast.success('Connexion réussie');
      navigate(result.redirectTo, { state: { from: location }, replace: true });
    } else if (result.error) {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="header-connexion">
        <Link to="/" className="return-link">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>Connexion</h1>
      </div>

      <form className="submit-form" onSubmit={handleSubmit}>

        <input
          className="input is-warning"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <input
          className="input is-warning"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button className="button is-warning is-light" type="submit">Connexion</button>

      </form>

      <div className="links-container">
        <Link className="link-forgot" to="/recover">Mot de passe oublié ?</Link>
        <Link className="link" to="/signup"> S'inscrire</Link>
      </div>

    </>
  );
}

export default Account;
