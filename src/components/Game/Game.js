import React from 'react';

import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS } from '../../constants';
import GuessInput from '../GuessInput/GuessInput';
import Banner from '../Banner/Banner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const emptyRow = range(0, NUM_OF_LETTERS).map(() => '');
  const initialState = range(0, NUM_OF_GUESSES_ALLOWED).map(() =>
    emptyRow.map(() => '')
  );

  const [words, setWords] = React.useState(initialState);
  const [numOfGuesses, setNumOfGuesses] = React.useState(1);
  const [win, setWin] = React.useState(false);
  const [finished, setFinished] = React.useState(false);

  const handleWordInput = (word) => {
    const index = words.findIndex((row) => row.includes(''));
    const step = index === -1 ? 0 : index;
    setNumOfGuesses(step + 1);

    if (step === NUM_OF_GUESSES_ALLOWED - 1) {
      setWin(false);
      setFinished(true);
    }

    const nextWord = word.slice(0, 5).toUpperCase();
    const nextWords = [...words];
    nextWords[step] = wordToArray(nextWord);
    setWords(nextWords);

    if (nextWord === answer) {
      setWin(true);
      setFinished(true);
    }
  };

  const wordToArray = (word) => {
    return Array.from(word);
  };

  return (
    <>
      <div className="game-wrapper">
        <div className="guess-results">
          {words.map((word) => (
            <p key={Math.random()} className="guess">
              {wordToArray(word).map((letter, index) => {
                const correctPlacement = answer.charAt(index) === letter;
                const invalidPlacement = answer.includes(letter);

                return (
                  <span
                    key={Math.random()}
                    className={`cell 
                  ${
                    letter === ''
                      ? ''
                      : !invalidPlacement
                      ? 'incorrect'
                      : correctPlacement
                      ? 'correct'
                      : 'misplaced'
                  }`}
                  >
                    {letter}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
      {!finished && <GuessInput words={words} setWord={handleWordInput} />}
      {finished && <Banner step={numOfGuesses} win={win} word={answer} />}
    </>
  );
}

export default Game;
