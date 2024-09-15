import { Component, OnInit } from '@angular/core';
import { Editora } from '../Editora';
import { Livro } from '../Livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css'],
})
export class LivroListaComponent implements OnInit {
  public editoras: Editora[] = [];
  public livros: Livro[] = [];

  private servEditora: ControleEditoraService;
  private servLivros: ControleLivrosService;

  constructor(
    servEditora: ControleEditoraService,
    servLivros: ControleLivrosService
  ) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
  }
  ngOnInit(): void {
    this.servEditora.getEditoras().subscribe((editoras) => {
      this.editoras = editoras;
    });

    this.servLivros.obterLivros().then((livros) => {
      this.livros = livros;
    });
  }

  excluir = async (codigo:string | null): Promise<void> => {
    try {
      await this.servLivros.excluirLivro(codigo);
      this.livros = await this.servLivros.obterLivros();
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
    }
  };
  
  obterNome = (codEditora: number): string | undefined => {
    const editora = this.editoras.find((e) => e.codEditora == codEditora);
    if (!editora) {
      console.log('Editora não encontrada:', codEditora);
    }

    return editora ? editora.nome : undefined;
  };
}
//erro ao incluir novo livro com a editora na tabela, e.codEditora == codEditora, para converter 
// ambos os lados para que encontrasse corretamente, ('5'== 5 = true) e com erro('5'=== 5 = false)

