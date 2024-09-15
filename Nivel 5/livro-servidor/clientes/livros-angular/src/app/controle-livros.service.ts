import { Injectable, Inject } from '@angular/core';
import { Livro } from './Livro';

const baseURL = 'http://localhost:3030/livros';

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ControleLivrosService {
  public livrosCarregados: Livro[];
  constructor(@Inject('livros') livros: Livro[]) {
    this.livrosCarregados = livros;
  }

  async obterLivros(): Promise<Livro[]> {
    try {
      const resposta = await fetch(baseURL);
      if (!resposta.ok) {
        throw new Error(`Erro ao obter livros`);
      }
      const data: LivroMongo[] = await resposta.json();
      const livros: Livro[] = data.map((livroMongo) =>
        this.converterLivro(livroMongo)
      );

      return livros;
    } catch (error) {
      throw error;
    }
  }

  async excluirLivro(codigo: string | null): Promise<boolean> {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });

      return resposta.ok;
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
      return false;
    }
  }

  async incluirLivro(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = this.converterLivroMongo(livro);
  
    try {
      const resposta = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroMongo),
      });
  
      return resposta.ok;
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      return false;
    }
  }
  
  private converterLivro(livroMongo: LivroMongo): Livro {
    return {
      codigo: livroMongo._id,
      codEditora: livroMongo.codEditora,
      titulo: livroMongo.titulo,
      resumo: livroMongo.resumo,
      autores: livroMongo.autores,
    };
  }

  private converterLivroMongo(livro: Livro): LivroMongo {
    return {
      _id: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };
  }
}
