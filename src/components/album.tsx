import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams();
  const [albumSelecionado, setAlbumSelecionado] = useState<AlbumType>();
  const [musics, setMusics] = useState<SongType[]>();
  useEffect(() => {
    getMusics(id ?? '').then((d) => {
      setAlbumSelecionado(d[0]);
      const musicas = d.slice(1, d.length - 1) as SongType[];
      setMusics(musicas);
    });
  }, [id]);
  return (
    <div>
      {

        (musics && albumSelecionado)
          ? (
            <>
              <div>
                <div>
                  <h2 data-testid="artist-name">{albumSelecionado.artistName}</h2>
                  <h2 data-testid="album-name">{albumSelecionado.collectionName}</h2>
                  <img src={ albumSelecionado.artworkUrl100 } alt="capa do album" />
                </div>
              </div>
              <div>
                {musics.map((m) => {
                  return (
                    <MusicCard
                      key={ m.trackId }
                      trackName={ m.trackName }
                      previewUrl={ m.previewUrl }
                    />
                  );
                })}
              </div>

            </>

          )
          : (
            <h2>Carregando...</h2>
          )
      }
    </div>
  );
}
export default Album;
