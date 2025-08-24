// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Home from './components/Home';
// import Animes from './components/Animes';
// import Pokemons from './components/Pokemons';
// import Heroes from './components/Heroes';
// import Yugioh from './components/Yugioh';

// const router = createBrowserRouter([
//   { 
//     path: '/', 
//     element: <Home /> 
//   },
//   { 
//     path: '/animes', 
//     element: <Animes /> 
//   },
//   { 
//     path: '/pokemons', 
//     element: <Pokemons /> 
//   },
//   { 
//     path: '/heroes', 
//     element: <Heroes /> 
//   },
//   { 
//     path: '/yu-gi-oh', 
//     element: <Yugioh /> 
//   },
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

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
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
