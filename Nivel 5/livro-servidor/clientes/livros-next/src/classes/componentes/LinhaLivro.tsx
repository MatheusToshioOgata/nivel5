import React from "react";
import { Livro } from "@/classes/modelo/Livro"
import ControleEditora, { arrayEditoras } from "@/classes/controle/ControleEditora";

const controleEditora = new ControleEditora(arrayEditoras);

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}
export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const handleDelete = () => {
    props.excluir(props.livro.codigo);
  };
  const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);
  return (
    <tr>
      <td>
        {props.livro.titulo}
        <br />
        <button className="btn btn-danger" onClick={handleDelete}>
          {" "}
          Excluir{" "}
        </button>
      </td>
      <td className="resumo-coluna">{props.livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {props.livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};