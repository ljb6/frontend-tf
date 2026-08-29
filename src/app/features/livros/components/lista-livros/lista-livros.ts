import { Component, input, output } from '@angular/core';
import { LivroCard } from '../livro-card/livro-card';
import { Livro } from '../../models/livros';

@Component({
  selector: 'app-lista-livros',
  standalone: true,
  imports: [LivroCard],
  templateUrl: './lista-livros.html',
  styleUrl: './lista-livros.css',
})
export class ListaLivros {
  livros = input.required<Livro[]>();
  carregando = input(false);
  erro = input<string | null>(null);
  excluir = output<string>();
}
