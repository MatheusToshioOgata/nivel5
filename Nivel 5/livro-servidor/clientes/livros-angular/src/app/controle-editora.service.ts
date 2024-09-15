import { Injectable } from '@angular/core';
import { Editora } from './Editora';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControleEditoraService {
  editoras: Editora[] = [
    {
      codEditora: 1,
      nome: 'Editora Fantasy',
    },
    {
      codEditora: 2,
      nome: 'Editora Clássicos',
    },
    {
      codEditora: 3,
      nome: 'Editora Mágica',
    },
  ];

  constructor() {}

  getEditoras(): Observable<Editora[]> {
    return of (this.editoras);
  }

  getNomeEditora(codEditora: number): Observable<string | undefined> {
    const editoraFilter = this.editoras.filter(
      (editora) => editora.codEditora === codEditora,
    );
    return of(editoraFilter.length > 0 ? editoraFilter[0].nome : undefined);
    
  }
}
