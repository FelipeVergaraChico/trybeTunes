import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';

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
    <div>
      <div>
        <input
          type="text"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          value={ artist }
          onChange={ handleName }
        />
        <button
          data-testid="search-artist-button"
          disabled={ artistaÉInvalido }
          onClick={ handleClick }
        >
          Procurar
        </button>
      </div>
      {
      (clicked && fetchEnded && albums.length > 0)
      && (
        <div>
          <h2>{`Resultado de álbuns de: ${artistaSalvo}`}</h2>
          {albums.map((i: AlbumType) => {
            return (
              <div key={ i.collectionId }>
                <img src={ i.artworkUrl100 } alt={ i.collectionName } />
                <Link
                  data-testid={ `link-to-album-${i.collectionId}` }
                  to={ `/album/${i.collectionId}` }
                >
                  <h3>{ i.collectionName }</h3>
                </Link>
                <h4>{ i.artistName }</h4>
              </div>
            );
          })}
        </div>
      )
    }
      {
      (clicked && fetchEnded && albums.length === 0)
      && (
        <h2>Nenhum álbum foi encontrado</h2>
      )
    }
      {
      (clicked && !fetchEnded)
      && (<Loading />)
    }
    </div>
  );
}
export default Search;
