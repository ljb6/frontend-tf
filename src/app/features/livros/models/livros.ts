export type StatusLivro = 'disponível' | 'indisponível';

export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: StatusLivro;
  descricao?: string;
}

export interface NovoLivro {
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  status: StatusLivro;
  descricao?: string;
}
