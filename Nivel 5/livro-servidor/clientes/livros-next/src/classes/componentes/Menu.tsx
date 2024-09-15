import React from "react";
import Link from "next/link";

export const Menu: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <ul className="navbar-nav mr-auto">
          <Link href="/" legacyBehavior>
            <a className="nav-link text-white">Início</a>
          </Link>

          <Link href="/LivroLista" legacyBehavior>
            <a className="nav-link text-white">Catálago</a>
          </Link>

          <Link href="/LivroDados" legacyBehavior>
            <a className="nav-link text-white">Novo</a>
          </Link>
        </ul>
      </nav>
    </>
  );
};
