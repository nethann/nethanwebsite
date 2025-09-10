import React, { useEffect, useState } from 'react';

const SpotifyAuth = () => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Your Spotify App credentials
  const CLIENT_ID = '581c25c7294a401283bf34166b506f0b';
  const REDIRECT_URI = 'https://example.com/callback';
  const SCOPES = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played'
  ].join(' ');

  useEffect(() => {
    // Check if we're coming back from Spotify with an access token
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        setToken(accessToken);
        // Clean up the URL
        window.location.hash = '';
      }
    }
  }, []);

  const handleLogin = () => {
    alert('Try this manual URL instead:\n\nhttps://accounts.spotify.com/authorize?client_id=581c25c7294a401283bf34166b506f0b&response_type=code&scope=user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&redirect_uri=https://example.com/callback&show_dialog=true');
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    alert('Token copied to clipboard! Now paste it in your .env file');
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '2rem auto', 
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      color: 'white',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h2 style={{ color: '#1db954', marginBottom: '1.5rem' }}>🎵 Get Your Spotify Token</h2>
      
      {!token ? (
        <div>
          <p>Click the button below to authenticate with Spotify and get your access token:</p>
          <button 
            onClick={handleLogin}
            disabled={isLoading}
            style={{
              background: '#1db954',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '24px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '1rem'
            }}
          >
            {isLoading ? 'Redirecting...' : 'Login with Spotify'}
          </button>
          
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px' }}>
            <h4>Instructions:</h4>
            <ol>
              <li>First, create a Spotify app at <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noreferrer" style={{color: '#1db954'}}>developer.spotify.com/dashboard</a></li>
              <li>Set the redirect URI to: <code>https://localhost:3000</code><br/>
                  <small style={{color: '#888'}}>✅ This should work with HTTPS</small></li>
              <li>Replace the CLIENT_ID in this component with your actual Client ID</li>
              <li>Then click "Login with Spotify" above</li>
            </ol>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ color: '#1db954' }}>✅ Success! Your Access Token:</h3>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginTop: '1rem',
            wordBreak: 'break-all',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            {token}
          </div>
          
          <button 
            onClick={copyToken}
            style={{
              background: '#1db954',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              marginTop: '1rem'
            }}
          >
            📋 Copy Token
          </button>
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(29, 185, 84, 0.1)', borderRadius: '8px' }}>
            <h4>Next Steps:</h4>
            <ol>
              <li>Copy the token above</li>
              <li>Open your <code>.env</code> file</li>
              <li>Replace the current REACT_APP_SPOTIFY_ACCESS_TOKEN value with this new token</li>
              <li>Restart your development server</li>
              <li>Your dynamic island will now show your real Spotify data!</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyAuth;