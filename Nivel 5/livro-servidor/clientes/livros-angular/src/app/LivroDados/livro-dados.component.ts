import { Component, OnInit } from '@angular/core';
import { Livro } from '../Livro';
import { Editora } from '../Editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css'],
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro;
  public autoresForm: string = '';
  public editoras: Editora[] = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {
    //this.livro = new Livro(null,0,'','',[]);
    this.livro = new Livro();
  }

  ngOnInit(): void {
    this.servEditora.getEditoras().subscribe((editoras) => {
      this.editoras = editoras;
    });
  }

  incluir = (): void => {
    this.livro.autores = this.autoresForm.split('\n');
    this.servLivros.incluirLivro(this.livro).then((sucesso) => {
      if (sucesso) {
        console.log('Livro incluído com sucesso!');
        this.router.navigateByUrl('/lista');
      } else {
        console.log('Erro ao incluir o livro');
      }
    });
  };
}
