import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './components/Home';
import Animes from './components/Animes';
import Pokemons from './components/Pokemons';
import Heros from './components/Heros';
import Yugioh from './components/Yugioh';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home /> 
  },
  { 
    path: '/animes', 
    element: <Animes /> 
  },
  { 
    path: '/pokemons', 
    element: <Pokemons /> 
  },
  { 
    path: '/heros', 
    element: <Heros /> 
  },
  { 
    path: '/yu-gi-oh', 
    element: <Yugioh /> 
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
