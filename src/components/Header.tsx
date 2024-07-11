import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userApi = await getUser();
      setUser(userApi.name);
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <header data-testid="header-component">
      {
      loading
        ? <Loading />
        : <h2 data-testid="header-user-name">{ user }</h2>
      }
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      </nav>
    </header>
  );
}
