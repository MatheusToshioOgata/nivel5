import { Editora } from "@/classes/modelo/Editora";

var editoras = [
  {
    codEditora: 1,
    nome: "Editora Fantasy",
  },
  {
    codEditora: 2,
    nome: "Editora Clássicos",
  },
  {
    codEditora: 3,
    nome: "Editora Mágica",
  },
];

class ControleEditora {
  public editoras2: Editora[];

  constructor(editoras: Editora[]) {
    this.editoras2 = editoras;
  }

  getEditoras(): Editora[] {
    return this.editoras2;
  }

  getNomeEditora(codEditora: number): string | undefined {
    const editoraFilter = this.editoras2.filter(
      (editora) => editora.codEditora === codEditora
    );
    return editoraFilter.length > 0 ? editoraFilter[0].nome : undefined;
  }
}
export const arrayEditoras = editoras.map(
  (editoras) => new Editora(editoras.codEditora, editoras.nome)
);
export default ControleEditora;
