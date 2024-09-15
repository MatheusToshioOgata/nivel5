import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ControleLivro from "../controle/ControleLivros";
import ControleEditora from "../controle/ControleEditora";
import { useNavigate } from "react-router-dom";

function LivroDados() {
  const controleLivro = useMemo(() => new ControleLivro(), []);
  const controleEditora = useMemo(() => new ControleEditora(), []);

  const [opcoes, setOpcoes] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState(
    opcoes.length > 0 ? opcoes[0].value : 1 
  );

  const navigate = useNavigate();

  useEffect(() => {
    const editoras = controleEditora.getEditoras();
    const opcoes = editoras.map((editora) => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(opcoes);
  }, [controleEditora]);

  function tratarCombo(event) {
    const valorSelecionado = Number(event.target.value);
    setCodEditora(valorSelecionado);
  }

  async function incluir(event) {
    event.preventDefault();

    // Construtor do livro
    const novoLivro = {
      codigo: null,
      titulo: titulo,
      resumo: resumo,
      codEditora: codEditora,
      autores: autores.split("\n"),
    };

    try {
      await controleLivro.incluirLivro(novoLivro);
      navigate("/");
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
    }
  }


  return (
    <main className="d-flex flex-column h-100 w-100 px-5">
      <h1>Dados do Livro</h1>
      <label htmlFor="titulo" className="form-label w-100">
        Título:
      </label>

      <input
        id="titulo"
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="form-control"
      />
      <label htmlFor="resumo" className="form-label w-100">
        Resumo:
      </label>

      <textarea
        id="resumo"
        type="text"
        value={resumo}
        onChange={(e) => setResumo(e.target.value)}
        className="form-control"
      />
      {/* combobox */}
      <label htmlFor="editora" className="form-label w-100">
        Editora:
      </label>
      <select className="form-control" id="editora" onChange={tratarCombo}>
        {opcoes.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.text}
          </option>
        ))}
      </select>

      <label htmlFor="autores" className="form-label w-100">
        Autores(1 por linha):
      </label>
      <textarea
        id="autores"
        type="text"
        value={autores}
        onChange={(e) => setAutores(e.target.value)}
        className="form-control"
      />
      <form onSubmit={incluir}>
        <button className="btn btn-primary mt-3" type="submit">
          Salvar Dados
        </button>
      </form>
    </main>
  );
}

export default LivroDados;
