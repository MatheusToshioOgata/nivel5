// export class Livro {
//   codigo: string | null;
//   codEditora: number;
//   titulo: string;
//   resumo: string;
//   autores: string[];

//   constructor(
//     codigo: string | null = null,
//     codEditora: number = 0,
//     titulo: string = '',
//     resumo: string = '',
//     autores: string[] = []
//   ) {
//     this.codigo = codigo;
//     this.codEditora = codEditora;
//     this.titulo = titulo;
//     this.resumo = resumo;
//     this.autores = autores;
//   }
// }
export class Livro {
    codigo: string | null;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];

    constructor(codigo: string | null = null,
      codEditora: number = 0,
      titulo: string = '',
      resumo: string = '',
      autores: string[] = []
      ) {
        this.codigo = codigo;
        this.codEditora = codEditora;
        this.titulo = titulo;
        this.resumo = resumo;
        this.autores = autores;
      }
}