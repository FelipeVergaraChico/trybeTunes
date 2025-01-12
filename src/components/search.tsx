import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';
import styles from './Search.module.css';

function Search() {
  const [artist, setArtist] = useState('');
  const [artistaÉInvalido, setArtistaÉInvalido] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [fetchEnded, setFetchEnded] = useState(false);
  const [artistaSalvo, setArtistaSalvo] = useState('');

  const handleName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(target.value);
    setArtistaÉInvalido(target.value.length < 2);
  };

  const handleClick = () => {
    setClicked(true);
    setFetchEnded(false);
    searchAlbumsAPI(artist).then((d) => {
      setAlbums(d);
      setFetchEnded(true);
    });
    setArtistaSalvo(artist);
    setArtist('');
  };
  return (
    <div className={ styles['search-container'] }>
      <div>
        <input
          type="text"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          value={ artist }
          onChange={ handleName }
          className={ styles['search-input'] }
        />
        <button
          data-testid="search-artist-button"
          disabled={ artistaÉInvalido }
          onClick={ handleClick }
          className={ styles['search-button'] }
        >
          Procurar
        </button>
      </div>

      {clicked && fetchEnded && (
        <div>
          {albums.length > 0 ? (
            <div className={ styles['album-container'] }>
              <h2>{`Resultado de álbuns de: ${artistaSalvo}`}</h2>
              {albums.map((i: AlbumType) => (
                <div key={ i.collectionId } className={ styles['album-item'] }>
                  <img src={ i.artworkUrl100 } alt={ i.collectionName } />
                  <Link
                    data-testid={ `link-to-album-${i.collectionId}` }
                    to={ `/album/${i.collectionId}` }
                  >
                    <h3>{i.collectionName}</h3>
                  </Link>
                  <h4>{i.artistName}</h4>
                </div>
              ))}
            </div>
          ) : (
            <h2 className={ styles['no-albums'] }>Nenhum álbum foi encontrado</h2>
          )}
        </div>
      )}

      {clicked && !fetchEnded && (
        <div className={ styles['loading-container'] }>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default Search;
