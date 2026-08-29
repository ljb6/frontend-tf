import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Livro, NovoLivro } from '../models/livros';
import { LivrosService } from './livros.service';

describe('LivrosService', () => {
  let service: LivrosService;
  let http: HttpTestingController;

  const apiUrl = 'http://localhost:3000/api/livros';
  const livro: Livro = {
    id: '66d0c7d32d23d81613fd975a',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    categoria: 'Romance',
    ano: 1899,
    status: 'disponível',
    descricao: 'Clássico da literatura brasileira.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LivrosService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(LivrosService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('deve listar os livros', async () => {
    const resultado = service.listar();
    const requisicao = http.expectOne(apiUrl);

    expect(requisicao.request.method).toBe('GET');
    requisicao.flush([livro]);

    await expect(resultado).resolves.toEqual([livro]);
  });

  it('deve cadastrar um novo livro', async () => {
    const novoLivro: NovoLivro = {
      titulo: livro.titulo,
      autor: livro.autor,
      categoria: livro.categoria,
      ano: livro.ano,
      status: livro.status,
      descricao: livro.descricao,
    };

    const resultado = service.criar(novoLivro);
    const requisicao = http.expectOne(apiUrl);

    expect(requisicao.request.method).toBe('POST');
    expect(requisicao.request.body).toEqual(novoLivro);
    requisicao.flush(livro);

    await expect(resultado).resolves.toEqual(livro);
  });

  it('deve retornar undefined quando o livro não existir', async () => {
    const resultado = service.buscarPorId(livro.id);
    const requisicao = http.expectOne(`${apiUrl}/${livro.id}`);

    requisicao.flush({ erro: 'Livro não encontrado.' }, { status: 404, statusText: 'Not Found' });

    await expect(resultado).resolves.toBeUndefined();
  });
});
