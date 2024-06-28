// UsernameInput.jsx
import React, { useState } from 'react';

const UsernameInput = ({ setUsername, onNext }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    // Check if username already exists and append number if needed
    // For simplicity, let's assume a function `checkAndSetUniqueUsername` exists
    const uniqueUsername = checkAndSetUniqueUsername(input);
    setUsername(uniqueUsername);
    onNext(); // Proceed to the next screen
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default UsernameInput;
