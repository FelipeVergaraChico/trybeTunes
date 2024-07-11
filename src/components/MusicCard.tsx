import { useEffect, useState } from 'react';
import { SongType } from '../types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

type MusicCardProps = {
  music: SongType;
  favorite: SongType[];
  favoriteFunction?: () => Promise<void> | undefined;
};

function MusicCard({ music, favorite, favoriteFunction = undefined }:MusicCardProps) {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleChange = (song: SongType) => {
    if (!isFavorite) {
      setIsFavorite(true);
      addSong(song);
    } else {
      setIsFavorite(false);
      removeSong(song);
    }
    if (favoriteFunction) {
      favoriteFunction();
    }
  };

  useEffect(() => {
    const favorites = async () => {
      setLoading(true);
      const check = favorite.find((s) => s.trackId === music.trackId);
      if (check) {
        setIsFavorite(true);
      }
      setLoading(false);
    };
    favorites();
  }, [favorite, music]);
  if (loading) {
    return <Loading />;
  }
  return (
    <li key={ music.trackId }>
      <h4>{ music.trackName }</h4>
      <audio data-testid="audio-component" src={ music.previewUrl } controls>
        <track kind="captions" />
      </audio>
      <label
        htmlFor={ `${music.trackId}` }
        data-testid={ `checkbox-music-${music.trackId}` }
      >
        <img
          src={ favorite
            ? '/images/checked_heart.png'
            : '/images/empty_heart.png' }
          alt="favorite"
        />
      </label>
      <input
        type="checkbox"
        id={ `${music.trackId}` }
        onChange={ () => handleChange(music) }
        checked={ isFavorite }
      />
    </li>
  );
}

export default MusicCard;
