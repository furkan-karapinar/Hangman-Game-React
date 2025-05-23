import React, { useContext } from 'react'


const Card = ({ man, randomLettersOptions, wordSpace, heart, word }) => {

    return (
        <div className='flex flex-col md:flex-row shadow-sm shadow-gray-400 dark:bg-gray-700 dark:border-gray-500 dark:shadow-gray-700 p-10 w-[70%] rounded-2xl'>
            <div className='w-full flex flex-col justify-center items-center'>
                <img src={man} className="dark:invert" alt="game-man" />

                <div className='flex justify-center items-center'>
                    <h1 className='text-gray-600 text-2xl dark:text-gray-300'>Remaining Life: {heart}</h1>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full gap-4'>
                <div className='flex flex-col align-center justify-center text-center gap-4'>

                    <div className="flex justify-center gap-2 mb-8">{wordSpace(word)}</div>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                    {randomLettersOptions(word)}
                </div>
            </div>
        </div>

    )
}

export default Card