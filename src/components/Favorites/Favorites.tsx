import React, { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../MusicCard';
import Loading from '../Loading';
import './Favorites.css';

function Favorites() {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

  const favorites = async () => {
    setLoading(true);
    const request = await getFavoriteSongs();
    setSongs(request);
    setLoading(false);
  };

  useEffect(() => {
    favorites();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="favorites-container">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2>Favorite Songs</h2>
          <div className="favorites-list">
            {songs.map((song) => (
              <MusicCard
                key={ song.trackId }
                music={ song }
                favorite={ songs }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default Favorites;
