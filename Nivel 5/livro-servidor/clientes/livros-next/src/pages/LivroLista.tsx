import React, { useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import { Menu } from "@/classes/componentes/Menu";
import Head from "next/head";
import Table from "react-bootstrap/Table";
import { Livro } from "@/classes/modelo/Livro";
import { LinhaLivro } from "@/classes/componentes/LinhaLivro";
import ControleLivros from "@/classes/controle/ControleLivros";

const LivroLista: NextPage = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState<boolean>(false);
  const controleLivros = useMemo(() => new ControleLivros([]), []);

  useEffect(() => {
    const obterLivros = async () => {
      try {
        const livrosObtidos = await controleLivros.obterLivros();
        setLivros(livrosObtidos);
        setCarregado(true);
      } catch (error) {
        console.error("Erro ao obter livros:", error);
      }
    };

    if (!carregado) {
      obterLivros();
    }
  }, [carregado, controleLivros]);

  const excluirLivro = async (codigo: string) => {
    try {
      await controleLivros.excluirLivro(codigo);
      setCarregado(false);
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
      </Head>
      <Menu />
      <main className="d-flex flex-column h-100 w-100 px-5">
        <h1>Catálogo de Livros</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="bg-dark text-white">Título</th>
              <th className="bg-dark text-white">Resumo</th>
              <th className="bg-dark text-white">Editora</th>
              <th className="bg-dark text-white">Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro
                key={`${index}_${livro.codigo}`}
                livro={livro}
                excluir={excluirLivro}
              />
            ))}
          </tbody>
        </Table>
      </main>
    </div>
  );
};

export default LivroLista;
