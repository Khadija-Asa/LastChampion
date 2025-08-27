import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Animes from './components/Animes';
import Pokemons from './components/Pokemons';
import Heroes from './components/Heroes';
import Yugioh from './components/Yugioh';
import Lol from './components/Lol';
import Villains from './components/Villains';
import Streetfighter from './components/Streetfighter';
import Esport from './components/Esport';
import Players from './components/Players';
import Videogames from './components/Videogames';
import Consoles from './components/Consoles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<Animes />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/heroes" element={<Heroes />} />
        <Route path="/yu-gi-oh" element={<Yugioh />} />
        <Route path="/lol" element={<Lol />} />
        <Route path="/villains" element={<Villains />} />
        <Route path="/streetfighter" element={<Streetfighter />} />
        <Route path="/esport-teams" element={<Esport />} />
        <Route path="/esport-players" element={<Players />} />
        <Route path="/video-games" element={<Videogames />} />
        <Route path="/game-consoles" element={<Consoles />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);