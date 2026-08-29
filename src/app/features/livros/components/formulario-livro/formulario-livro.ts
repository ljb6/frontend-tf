import { Component, ElementRef, effect, input, output, signal, viewChild } from '@angular/core';
import { NovoLivro, StatusLivro } from '../../models/livros';

@Component({
  selector: 'app-formulario-livro',
  standalone: true,
  templateUrl: './formulario-livro.html',
  styleUrl: './formulario-livro.css',
})
export class FormularioLivro {
  aberto = input.required<boolean>();
  salvando = input(false);

  titulo = signal('');
  autor = signal('');
  categoria = signal('');
  ano = signal<number | null>(null);
  status = signal<StatusLivro>('disponível');
  descricao = signal('');

  fechar = output<void>();
  salvar = output<NovoLivro>();

  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dialogo');

  constructor() {
    effect(() => {
      const elemento = this.dialogo().nativeElement;
      if (this.aberto() && !elemento.open) {
        elemento.showModal();
      } else if (!this.aberto() && elemento.open) {
        elemento.close();
      }
    });
  }

  alterarTexto(campo: 'titulo' | 'autor' | 'categoria' | 'descricao', event: Event): void {
    const valor = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this[campo].set(valor);
  }

  alterarAno(event: Event): void {
    const valor = (event.target as HTMLInputElement).valueAsNumber;
    this.ano.set(Number.isNaN(valor) ? null : valor);
  }

  alterarStatus(event: Event): void {
    this.status.set((event.target as HTMLSelectElement).value as StatusLivro);
  }

  enviar(event: Event): void {
    event.preventDefault();
    const ano = this.ano();
    if (ano === null) {
      return;
    }

    this.salvar.emit({
      titulo: this.titulo(),
      autor: this.autor(),
      categoria: this.categoria(),
      ano,
      status: this.status(),
      descricao: this.descricao() || undefined,
    });
  }

  aoFechar(): void {
    this.titulo.set('');
    this.autor.set('');
    this.categoria.set('');
    this.ano.set(null);
    this.status.set('disponível');
    this.descricao.set('');
    this.fechar.emit();
  }
}
