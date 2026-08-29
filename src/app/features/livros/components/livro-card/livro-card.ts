import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livro } from '../../models/livros';

@Component({
  selector: 'app-livro-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livro-card.html',
  styleUrl: './livro-card.css',
})
export class LivroCard {
  livro = input.required<Livro>();
  excluir = output<string>();
}
