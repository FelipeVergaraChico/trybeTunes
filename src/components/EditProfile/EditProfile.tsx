import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../Loading';
import { UserType } from '../../types';
import './EditProfile.css'; // Importando o arquivo de estilos CSS

function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userApi = await getUser();
      setUser(userApi);
      setName(userApi.name);
      setEmail(userApi.email);
      setDescription(userApi.description);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    await updateUser({
      name,
      email,
      description,
      image: '',
    });
    setLoading(false);
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2 data-testid="header-user-name">{user?.name}</h2>
          <input
            type="text"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
            data-testid="edit-profile-input-name"
          />
          <input
            type="text"
            value={ email }
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
            data-testid="edit-profile-input-email"
          />
          <input
            type="text"
            value={ description }
            placeholder="Descrição"
            onChange={ ({ target }) => setDescription(target.value) }
            data-testid="edit-profile-input-description"
          />
          <button
            type="button"
            onClick={ handleClick }
            data-testid="edit-profile-save-button"
            disabled={ loading }
          >
            Salvar
          </button>
        </div>
      )}
    </div>
  );
}
export default EditProfile;
