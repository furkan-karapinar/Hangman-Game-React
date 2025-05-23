import React, { Children, useEffect, createContext, useState } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {

  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode)
  }


  const values = { darkMode, setDarkMode, toggleTheme }

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
