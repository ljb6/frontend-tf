import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Livro } from '../../models/livros';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livro-detalhe-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livro-detalhe-page.html',
  styleUrl: './livro-detalhe-page.css',
})
export class LivroDetalhePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(LivrosService);

  readonly livro = signal<Livro | undefined>(undefined);
  readonly carregando = signal(true);
  readonly erro = signal<string | null>(null);

  ngOnInit(): void {
    void this.carregar();
  }

  async excluir(): Promise<void> {
    const livro = this.livro();
    if (!livro || !window.confirm('Deseja realmente excluir este livro?')) {
      return;
    }

    try {
      await this.service.deletar(livro.id);
      await this.router.navigate(['/livros']);
    } catch {
      this.erro.set('Não foi possível excluir o livro.');
    }
  }

  private async carregar(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.carregando.set(false);
      return;
    }

    try {
      this.livro.set(await this.service.buscarPorId(id));
    } catch {
      this.erro.set('Não foi possível carregar os detalhes do livro.');
    } finally {
      this.carregando.set(false);
    }
  }
}
