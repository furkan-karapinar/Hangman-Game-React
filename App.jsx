import { useState, useContext, useEffect, useRef, use } from 'react'
import './App.css'
import { ThemeContext } from './ThemeContext'
import man1 from './assets/man/1.png'
import man2 from './assets/man/2.png'
import man3 from './assets/man/3.png'
import man4 from './assets/man/4.png'
import man5 from './assets/man/5.png'
import man6 from './assets/man/6.png'
import man7 from './assets/man/7.png'
import Swal from 'sweetalert2'
import bigbrain from './assets/big_brain.png'
import { GrPowerReset } from "react-icons/gr";
import Card from './components/Card'
import ThemeSwitchButton from './components/ThemeSwitchButton'

function App() {

  const { darkMode, setDarkMode, toggleTheme } = useContext(ThemeContext)

 // Checks the dark theme value from localstorage
  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true)
    }
    if (localStorage.getItem('darkMode') === 'false') {
      setDarkMode(false)
    }
  }, [])

  // If darkmode is active, dark class is added to the body element and dark theme is activated.
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])


  // List of words
  const words = [
    "apple", "dance", "elephant", "mirror", "ocean",
    "guitar", "wonder", "friend", "skyline", "magic",
    "forest", "dream", "light", "happy", "shadow", "description",
  ];


  const manlist = [man1, man2, man3, man4, man5, man6, man7]
  const [heart, setHeart] = useState(6)
  const [index, setIndex] = useState(0)
  const randomWord = () => { return words[Math.floor(Math.random() * words.length)].toUpperCase() };
  const [word, setWord] = useState(randomWord);
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Changes the Hangman image and decreases the life value by 1. 
  // If the life is 1 and less than 1, the game is over and 
  // the message function is executed to send a message to the user that they have lost.
  const nextman = () => {
    setIndex((index + 1) % manlist.length); 
    setHeart((prevHeart) => prevHeart - 1); 
    if (heart <= 1) {
      message(true);
    }
  };

  // This function creates a field for each letter of the word and shows the letter if it has been guessed
  const wordSpace = (wordd) => {
    return wordd.split("").map((letter, idx) => (
      <h1
        key={idx} id={`index_${idx}`}
        className="text-6xl font-bold border-b-2 border-gray-500 text-black dark:text-white dark:border-gray-300 mx-1"
      >
        {guessedLetters.includes(letter) ? letter : "_"}
      </h1>
    ));
  };

  // Check if the word field contains all the letters of the word and if it does, 
  // call the message function false to show the message that you have won the game
  useEffect(() => {
    if (word.split("").every((letter) => guessedLetters.includes(letter))) {
      message(false);
    }
  }
    , [guessedLetters]);


  // This function is used to create a random letter and add it to the hidden word space
  // This function is called when the user clicks on a letter
  const randomLettersOptions = (wordd) => {
    return Array.from(new Set([
      ...word,
      ...Array.from({ length: 15 }, () => {
        let randomLetter;
        do {
          randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        } while ([...word, ...guessedLetters].includes(randomLetter));
        return randomLetter;
      })
    ]))
      .sort(() => Math.random() - 0.5)
      .filter((letter) => !guessedLetters.includes(letter))
      .map((letter, idx) => (
        <button
          key={idx}
          onClick={() => {
            if (!wordd.includes(letter)) {
              nextman();
            } else {
              setGuessedLetters([...guessedLetters, letter]);
            }
          }}
          className="bg-gray-100 border-2 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded-lg"
        >
          {letter}
        </button>
      ))
  }

  // Reset game function
  // Set heart to 6, index to 0, guessed letters to empty array and word to random word
  // This function is called when the user loses or wins and when the user clicks the reset button
  const resetgame = () => {
    setHeart(6);
    setIndex(0);
    setGuessedLetters([]);
    setWord(randomWord);
  }

  // SweetAlert2 message
  // status true = lost, false = won
  const message = (status) => {
    Swal.fire({
      title: status ? 'You Lost!' : 'You Won!',
      html: status 
      ? '<p>Better luck next time!</p>' 
      : `
      <div class=" flex flex-col justify-center items-center"><p>Congratulations!</p><img src="${bigbrain}" class="w-[50%] mt-4 dark:bg-white rounded-2xl" alt="Big Brain" /> </div>`,
      icon: status ? 'error' : 'success',
      timer: 2000,
      showConfirmButton: false,
      allowOutsideClick: false,
      background: darkMode ? '#3E4A61' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      willClose: () => {
      resetgame();
      }
    });
  }



  return (
    <>
    
      <div className=' flex flex-col items-center justify-center'>
      <div className='flex items-end w-full justify-end mt-2'>
        <ThemeSwitchButton />
          <button onClick={resetgame} className='top-buttons'>
          <GrPowerReset />
          </button>
        </div>
        <h1 className='game-title'>Hangman Game</h1>
       <Card man={manlist[index]} randomLettersOptions={randomLettersOptions} wordSpace={wordSpace} heart={heart} word={word}/> 
      </div>
    </>
  )
}

export default App
