import { Component, input, output } from '@angular/core';
import { StatusLivro } from '../../models/livros';

@Component({
  selector: 'app-filtro-livros',
  standalone: true,
  templateUrl: './filtro-livros.html',
  styleUrl: './filtro-livros.css',
})
export class FiltroLivros {
  pesquisa = input.required<string>();
  status = input.required<StatusLivro | 'todos'>();
  pesquisaChange = output<string>();
  statusChange = output<StatusLivro | 'todos'>();

  alterarPesquisa(event: Event): void {
    this.pesquisaChange.emit((event.target as HTMLInputElement).value);
  }

  alterarStatus(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value as StatusLivro | 'todos';
    this.statusChange.emit(valor);
  }
}
