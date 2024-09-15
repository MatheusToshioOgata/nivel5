import { Livro } from "../modelo/Livro";

const baseURL = "http://localhost:3030/livros";

interface LivroMongo {
  _id: string | null;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

class ControleLivro {
  public livrosCarregados: Livro[];
  constructor(livros: Livro[]) {
    this.livrosCarregados = livros;
  }
  async obterLivros(): Promise<Livro[]> {
    try {
      const resposta = await fetch(baseURL);
      const livrosMongo: LivroMongo[] = await resposta.json();

      return livrosMongo.map((livroMongo) => this.converterLivro(livroMongo));
    } catch (error) {
      console.error("Erro ao obter livros:", error);
      throw error;
    }
  }

  async excluirLivro(codigo: string): Promise<boolean> {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, {
        method: "DELETE",
      });

      return resposta.ok;
    } catch (error) {
      console.error("Erro ao excluir o livro:", error);
      return false;
    }
  }

  async incluirLivro(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = this.converterLivroMongo(livro);
  
    try {
      const resposta = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroMongo),
      });
  
      if (resposta.ok) {
        const livrosMongo: LivroMongo[] = await resposta.json();
        const livroIncluido = this.converterLivro(livrosMongo[0]);
        this.livrosCarregados.push(livroIncluido);
  
        console.log('Livro incluído com sucesso!');
        return true; 
      } else {
        console.log('Falha ao incluir livro:', resposta.statusText);
        return false;
      }
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

export default ControleLivro;
