import React,{useContext} from 'react'
import { ThemeContext } from '../ThemeContext'
import { IoMdSunny,IoMdMoon  } from "react-icons/io";


const ThemeSwitchButton = () => {
    const { darkMode, setDarkMode, toggleTheme } = useContext(ThemeContext)

    return (
        <button onClick={toggleTheme} className='top-buttons'>
            {darkMode ? <IoMdSunny /> : <IoMdMoon />}
        </button>
    )
}

export default ThemeSwitchButton