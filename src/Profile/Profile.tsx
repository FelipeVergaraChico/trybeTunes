import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import { UserType } from '../types';
import './Profile.css'; // Importando o arquivo de estilos CSS

function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userApi = await getUser();
      setUser(userApi);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="profile-container">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2 data-testid="header-user-name">{user?.name}</h2>
          <p data-testid="header-user-email">{user?.email}</p>
          <p data-testid="header-user-description">{user?.description}</p>
          <Link to="/edit-profile" className="edit-profile-link">
            Editar Perfil
          </Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
