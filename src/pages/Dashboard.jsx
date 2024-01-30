import React, { useState } from 'react';


export default function Dashboard(){

  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (event) => {
    setUserGuess(event.target.value);
  };

  const handleGuess = () => {
    const guessedNumber = parseInt(userGuess, 10);

    if (isNaN(guessedNumber)) {
      setFeedback('Please enter a valid number');
    } else {
      if (guessedNumber === targetNumber) {
        setFeedback('Congratulations! You guessed the correct number!');
      } else if (guessedNumber < targetNumber) {
        setFeedback('Too low. Try again!');
      } else {
        setFeedback('Too high. Try again!');
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '20vh' }}>
      <h1 className='font-bold mb-3'>Guess the Number Game</h1>
      <input
        type="text"
        value={userGuess}
        onChange={handleInputChange}
        placeholder="Enter your guess"
      />

      <p>{feedback}</p>

      <button onClick={handleGuess} className="view-more-button mt-3">Guess</button>
    </div>
  );
};
