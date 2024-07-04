import React, { useEffect } from "react"
import '../css/Home.css'
import axios from "axios"

const Home = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-text">Explore!</h1>
                <p className='hero-description'>
                "Wander through our enchanting collection of books, where each page whispers the promise of what you seek."
                </p>
            </div>
            <div className="hero-image"></div>
        </div>
    )
}

export default Home