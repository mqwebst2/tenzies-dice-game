import { useEffect, useState } from 'react';
import Dice from './Dice';
import Confetti from 'react-confetti';

import './App.css';

export default function App() {
  const [dice, setDice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const win = (arr) => {
      return arr.every((item) => item.isHeld && item.num === arr[0].num);
    };

    setTenzies(win(dice));
  }, [dice]);

  function newDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      const singleDice = {
        id: '',
        num: '',
        isHeld: false,
      };
      singleDice.id = i + 1;
      singleDice.num = Math.ceil(Math.random() * 6);
      diceArray.push(singleDice);
    }
    return diceArray;
  }

  function diceRoll() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        const newNum = Math.ceil(Math.random() * 6);
        return die.isHeld ? { ...die } : { ...die, num: newNum };
      })
    );
  }

  function diceHold(diceId) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return diceId === die.id ? { ...die, isHeld: !die.isHeld } : { ...die };
      })
    );
  }

  const diceElements = dice.map((item) => {
    return (
      <Dice
        key={item.id}
        id={item.id}
        num={item.num}
        isHeld={item.isHeld}
        diceHold={() => diceHold(item.id)}
      />
    );
  });

  return (
    <main>
      {tenzies && <Confetti />}

      <div className='game'>
        <h1>Tenzies</h1>
        <p>
          Roll untill all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>

      <div className='dice-grid'>{diceElements}</div>
      <button
        className='dice-roll'
        onClick={() => (tenzies ? setDice(newDice()) : diceRoll())}
      >
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
