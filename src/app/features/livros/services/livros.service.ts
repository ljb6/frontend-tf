import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Livro, NovoLivro } from '../models/livros';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://backend-tf-v05y.onrender.com/api/livros';

  listar(): Promise<Livro[]> {
    return firstValueFrom(this.http.get<Livro[]>(this.apiUrl));
  }

  criar(novoLivro: NovoLivro): Promise<Livro> {
    const livro: NovoLivro = {
      titulo: novoLivro.titulo,
      autor: novoLivro.autor,
      categoria: novoLivro.categoria,
      ano: novoLivro.ano,
      status: novoLivro.status,
      descricao: novoLivro.descricao || undefined,
    };

    return firstValueFrom(this.http.post<Livro>(this.apiUrl, livro));
  }

  async buscarPorId(id: string): Promise<Livro | undefined> {
    try {
      return await firstValueFrom(this.http.get<Livro>(`${this.apiUrl}/${id}`));
    } catch (erro) {
      if (erro instanceof HttpErrorResponse && erro.status === 404) {
        return undefined;
      }
      throw erro;
    }
  }

  deletar(id: string): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/${id}`));
  }
}
