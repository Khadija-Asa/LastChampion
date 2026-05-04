import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';

const Animes        = lazy(() => import('./components/Animes'));
const Pokemons      = lazy(() => import('./components/Pokemons'));
const Heroes        = lazy(() => import('./components/Heroes'));
const Yugioh        = lazy(() => import('./components/Yugioh'));
const Lol           = lazy(() => import('./components/Lol'));
const Villains      = lazy(() => import('./components/Villains'));
const Streetfighter = lazy(() => import('./components/Streetfighter'));
const Esport        = lazy(() => import('./components/Esport'));
const Players       = lazy(() => import('./components/Players'));
const Videogames    = lazy(() => import('./components/Videogames'));
const Consoles      = lazy(() => import('./components/Consoles'));
const Characters    = lazy(() => import('./components/Characters'));
const Manga         = lazy(() => import('./components/Manga'));
const Retro         = lazy(() => import('./components/Retro'));
const Cartoons      = lazy(() => import('./components/Cartoons'));
const Youtubers     = lazy(() => import('./components/Youtubers'));
const Valorant      = lazy(() => import('./components/Valorant'));
const Tournaments   = lazy(() => import('./components/Tournaments'));
const Fifa          = lazy(() => import('./components/Fifa'));
const Onepiece      = lazy(() => import('./components/Onepiece'));
const Movies        = lazy(() => import('./components/Movies'));
const Series        = lazy(() => import('./components/Series'));
const Football      = lazy(() => import('./components/Football'));
const Fortnite      = lazy(() => import('./components/Fortnite'));
const Legal         = lazy(() => import('./components/LegalMentions'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/animes"              element={<Animes />} />
          <Route path="/pokemons"            element={<Pokemons />} />
          <Route path="/super-heroes"        element={<Heroes />} />
          <Route path="/yu-gi-oh"            element={<Yugioh />} />
          <Route path="/lol"                 element={<Lol />} />
          <Route path="/villains"            element={<Villains />} />
          <Route path="/streetfighter"       element={<Streetfighter />} />
          <Route path="/esport-teams"        element={<Esport />} />
          <Route path="/esport-players"      element={<Players />} />
          <Route path="/video-games"         element={<Videogames />} />
          <Route path="/game-consoles"       element={<Consoles />} />
          <Route path="/characters"          element={<Characters />} />
          <Route path="/manga"               element={<Manga />} />
          <Route path="/retro-games"         element={<Retro />} />
          <Route path="/cartoon-heroes"      element={<Cartoons />} />
          <Route path="/youtubers-streamers" element={<Youtubers />} />
          <Route path="/valorant-agents"     element={<Valorant />} />
          <Route path="/esport-tournaments"  element={<Tournaments />} />
          <Route path="/fifa26-clubs"        element={<Fifa />} />
          <Route path="/one-piece"           element={<Onepiece />} />
          <Route path="/movies"              element={<Movies />} />
          <Route path="/series"              element={<Series />} />
          <Route path="/football-players"    element={<Football />} />
          <Route path="/fortnite-skins"      element={<Fortnite />} />
          <Route path="/mentions-legales"    element={<Legal />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
