import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from './Album.module.css';

function Album() {
  const { id } = useParams();
  const [albumSelecionado, setAlbumSelecionado] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>();
  const [favoritesMusics, setFavoritesMusics] = useState<SongType[]>([]);
  useEffect(() => {
    getMusics(id ?? '').then(async (d) => {
      setAlbumSelecionado(d[0]);
      const musicas = await d.slice(1, d.length) as SongType[];
      const favorites = await getFavoriteSongs();
      setFavoritesMusics(favorites);
      setMusics(musicas);
    });
  }, [id]);
  return (
    <div className={ styles['album-container'] }>
      {musics && albumSelecionado ? (
        <>
          <div className={ styles['album-info'] }>
            <div>
              <h2 data-testid="artist-name">{albumSelecionado.artistName}</h2>
              <h2 data-testid="album-name">{albumSelecionado.collectionName}</h2>
            </div>
            <img
              src={ albumSelecionado.artworkUrl100 }
              alt="capa do album"
              className={ styles['album-cover'] }
            />
          </div>
          <div className={ styles['music-list'] }>
            {musics.map((m) => (
              <MusicCard
                key={ m.trackId }
                music={ m }
                favorite={ favoritesMusics }
              />
            ))}
          </div>
        </>
      ) : (
        <h2>Carregando...</h2>
      )}
    </div>
  );
}
export default Album;
