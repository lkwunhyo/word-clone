import React from 'react';

function GuessInput({ words, setWord }) {
  const [input, setInput] = React.useState('');

  return (
    <>
      <form
        className="guess-input-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          if (words.includes(input)) {
            alert('This word is taken');
          } else {
            setWord(input);
            setInput('');
          }
        }}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          value={input}
          pattern="\w{5,5}"
          title="Your input must be 5 letters"
          required={true}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </form>
    </>
  );
}

export default GuessInput;
