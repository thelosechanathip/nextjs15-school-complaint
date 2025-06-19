import React from 'react'

const Footer = () => {
    return (
        <div className='fixed bottom-0 left-0 w-full bg-gray-800 text-gray-300 py-3 text-center z-50'>
            <p>© {new Date().getFullYear()} Mun UiPui Company. All rights reserved.</p>
        </div>
    )
}

export default Footer