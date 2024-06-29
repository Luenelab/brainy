import React, { useState } from 'react';

const token = process.env.REACT_APP_GITHUB_TOKEN;

const UsernameInput = ({ setUsername, onNext }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const username = input.trim().toLowerCase(); // Normalize input for comparison
      const repoOwner = 'luenelab'; // Replace with your GitHub username or organization
      const repoName = 'brainy'; // Replace with your repository name
      const path = `brain_sourcefiles/${username}.md`;
      const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // If the file exists, username is not unique
        setError(`Username '${username}' already exists.`);
      } else if (response.status === 404) {
        // If file does not exist, username is unique
        setUsername(username);
        onNext(); // Proceed to the next screen
      } else {
        throw new Error(`Failed to check username existence: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error checking username existence:', error);
      setError('Failed to check username existence. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Checking...' : 'Next'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UsernameInput;
