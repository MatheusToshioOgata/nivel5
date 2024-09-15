import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './componentes/LivroLista';
import LivroDados from './componentes/LivroDados';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <ul className="navbar-nav mr-auto">
          <Link className="nav-link text-white" to="/">Catálogo</Link>
          <Link className="nav-link text-white" to="/dados">Novo</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<LivroLista />} />
        <Route path="/dados" element={<LivroDados />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
