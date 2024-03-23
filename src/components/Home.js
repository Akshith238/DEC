import React, { useState, useEffect } from 'react';

const SpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    if (params.has('access_token')) {
      const accessToken = params.get('access_token');
      setAccessToken(accessToken);
      getTopTracks(accessToken);
    }
  }, []);

  const handleLogin = () => {
    const client_id = '20dbf03b0a754ae38736b942843566f6';
    const redirect_uri = 'http://localhost:3000';
    const scope = 'user-top-read';
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    window.location = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`;
  };

  const handleLogout = () => {
    setAccessToken(null);
    setTopTracks([]);
    // Optionally, you can clear localStorage or perform other cleanup tasks
  };

  const getTopTracks = async (accessToken) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTopTracks(data.items);
      } else {
        console.error('Failed to fetch top tracks');
      }
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  return (
    <div>
      {!accessToken ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <div>
          <p>Logged in!</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>Top Tracks</h2>
          <ul>
            {topTracks.map((track, index) => (
              <li key={index}>{track.name} - {track.artists[0].name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpotifyAuth;
