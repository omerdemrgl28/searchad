import React, { useState, useEffect } from 'react';
import background from '../images/background1.jpg';
import 'bulma/css/bulma.css';
import { useNavigate } from "react-router-dom";

function HostComp() {
 const navigate = useNavigate();
  const [helloIndex, setHelloIndex] = useState(0);
  const hellos = [
    "MERHABA!",
    "HELLO!",
    "HOLA!",
    "BONJOUR!",
    "HALLO!",
    "CIAO!",
    "नमस्ते!",
    "नमस्कार!",
    "হ্যালো!",
    "مرحبا!",
    "سلام!",
    "こんにちは!",
    "你好!",
    "Привет!",
    "გამარჯობა!",
    "שלום!",
    "ਹੈਲੋ!",
    "OLÁ!",
    "HEJ!",
    "HEI!",
    "HOLA!",
    "ALOHA!",
    "SALUT!",
    "CZEŚĆ!",
    "HOI!",
    "HEI!",
    "LABAS!",
    "SVEIKI!",
    "ПРИВІТ!",
    "MERHABA!"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setHelloIndex(prevIndex => (prevIndex + 1) % hellos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [hellos.length]);

  return (
    <div className="background-image">
      <img src={background} alt="Arka plan resmi" />
      <div className="text-overlay">
        <h1>{hellos[helloIndex]}</h1>
        <p>DISCOVER RICK AND MORTY WITH SEARCH.</p>
        <div>
          <button className="button is-black" style={{ marginRight: '20px', width: '250px', height: '60px' }} onClick={() => navigate('/searchpage')}>SEARCH</button>
        </div>
      </div>
    </div>
  );
}
export default HostComp;
