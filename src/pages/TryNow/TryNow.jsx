import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const TryNow = () => {
    return (
        <>
            <Navbar />
            <div className="cont" style={{width: "100%", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <h1>This Feature Is Under Development 🖥️</h1>
            </div>
            <Footer />
        </>
    )
}

export default TryNow