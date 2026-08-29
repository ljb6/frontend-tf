import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FiltroLivros } from '../../components/filtro-livros/filtro-livros';
import { FormularioLivro } from '../../components/formulario-livro/formulario-livro';
import { ListaLivros } from '../../components/lista-livros/lista-livros';
import { Livro, NovoLivro, StatusLivro } from '../../models/livros';
import { LivrosService } from '../../services/livros.service';

@Component({
  selector: 'app-livros-page',
  standalone: true,
  imports: [FiltroLivros, ListaLivros, FormularioLivro],
  templateUrl: './livros-page.html',
  styleUrl: './livros-page.css',
})
export class LivrosPage implements OnInit {
  private readonly livrosService = inject(LivrosService);

  readonly livros = signal<Livro[]>([]);
  readonly pesquisa = signal('');
  readonly filtroStatus = signal<StatusLivro | 'todos'>('todos');
  readonly carregando = signal(false);
  readonly salvando = signal(false);
  readonly erro = signal<string | null>(null);
  readonly modalAberto = signal(false);

  readonly livrosFiltrados = computed(() => {
    const termo = this.pesquisa().trim().toLowerCase();
    const status = this.filtroStatus();

    return this.livros().filter((livro) => {
      const correspondeTexto =
        termo === '' ||
        livro.titulo.toLowerCase().includes(termo) ||
        livro.autor.toLowerCase().includes(termo) ||
        livro.categoria.toLowerCase().includes(termo);
      const correspondeStatus = status === 'todos' || livro.status === status;
      return correspondeTexto && correspondeStatus;
    });
  });

  ngOnInit(): void {
    void this.carregarLivros();
  }

  async carregarLivros(): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);
    try {
      this.livros.set(await this.livrosService.listar());
    } catch {
      this.erro.set('Não foi possível carregar os livros. Verifique se a API está ativa.');
    } finally {
      this.carregando.set(false);
    }
  }

  abrirFormulario(): void {
    this.modalAberto.set(true);
  }

  fecharFormulario(): void {
    this.modalAberto.set(false);
  }

  async criarLivro(dados: NovoLivro): Promise<void> {
    this.salvando.set(true);
    this.erro.set(null);
    try {
      const novo = await this.livrosService.criar(dados);
      this.livros.update((lista) => [...lista, novo]);
      this.modalAberto.set(false);
    } catch {
      this.erro.set('Não foi possível cadastrar o livro.');
    } finally {
      this.salvando.set(false);
    }
  }

  async excluirLivro(id: string): Promise<void> {
    if (!window.confirm('Deseja realmente excluir este livro?')) {
      return;
    }

    this.erro.set(null);
    try {
      await this.livrosService.deletar(id);
      this.livros.update((lista) => lista.filter((livro) => livro.id !== id));
    } catch {
      this.erro.set('Não foi possível excluir o livro.');
    }
  }

  atualizarPesquisa(valor: string): void {
    this.pesquisa.set(valor);
  }

  atualizarStatus(valor: StatusLivro | 'todos'): void {
    this.filtroStatus.set(valor);
  }
}
