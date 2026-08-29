import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivrosPage } from './features/livros/pages/livros-page/livros-page';
import { LivroDetalhePage } from './features/livros/pages/livro-detalhe-page/livro-detalhe-page';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'livros' },
  { path: 'livros', component: LivrosPage },
  { path: 'livros/:id', component: LivroDetalhePage },
  { path: '**', redirectTo: 'livros' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
