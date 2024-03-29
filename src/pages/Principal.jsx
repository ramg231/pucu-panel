import React from 'react'
import LoginPage from "../components/LoginPage";
function Principal() {
  return (
    <div className='h-screen bg-cover bg-center' style={{backgroundImage: 'url("https://i.imgur.com/5k1OiFD.jpeg")'}}>
        <LoginPage/>
    </div>
  )
}

export default Principal