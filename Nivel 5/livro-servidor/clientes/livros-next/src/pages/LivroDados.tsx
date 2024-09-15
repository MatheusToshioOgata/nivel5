import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Menu } from "@/classes/componentes/Menu";
import ControleEditora, { arrayEditoras } from "@/classes/controle/ControleEditora";
import  ControleLivros  from "@/classes/controle/ControleLivros";
import { Livro } from "@/classes/modelo/Livro";

interface Opcao {
  value: number;
  text: string;
}
const LivroDados: NextPage = () => {
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [controleLivros] = useState(new ControleLivros([]));

  useEffect(() => {
    const controleEditora = new ControleEditora(arrayEditoras);
    const editoras = controleEditora.getEditoras();
    const opcoes = editoras.map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(opcoes);
  }, []);

  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState( //para trazer a editora correta value 1
    opcoes.length > 0 ? opcoes[0].value : 1 
  );

  const tratarCombo = (event: ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const novoLivro = new Livro(
      null, 
      Number(codEditora),
      titulo,
      resumo,
      autores.split("\n")
    );
    try {
      controleLivros.incluirLivro(novoLivro);
      router.push("/LivroLista");
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>LivroDados</title>
        <meta name="description" content="Inclusão de Livros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className="d-flex flex-column h-100 w-100 px-5">
        <h1>Novo Livro</h1>
        <form onSubmit={incluir}>
          <div>
            <label htmlFor="titulo" className="form-label w-100">Título:</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="resumo" className="form-label w-100">Resumo:</label>
            <textarea
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="editora" className="form-label w-100">Editora:</label>
            <select className="form-control" id="editora" value={codEditora} onChange={tratarCombo}>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="autores" className="form-label w-100">Autores:</label>
            <textarea
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">Salvar Dados</button>
        </form>
      </main>
    </div>
  );
};
export default LivroDados;
