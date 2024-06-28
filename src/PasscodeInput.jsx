// PasscodeInput.jsx
import React, { useState } from 'react';

const PasscodeInput = ({ setPasscode, onNext }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    // Set the passcode and proceed to the main app
    setPasscode(input);
    onNext();
  };

  return (
    <div>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter 4-digit passcode"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PasscodeInput;
