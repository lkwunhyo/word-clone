import React from 'react';

function Banner({ step, win, word }) {
  return (
    <header>
      {win ? (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{' '}
            <strong>{step} guesses</strong>.
          </p>
        </div>
      ) : (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{word}</strong>
          </p>
        </div>
      )}
    </header>
  );
}

export default Banner;
