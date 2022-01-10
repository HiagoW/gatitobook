import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // pathMatch full retira espaços da url
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  //loadChildren importa sob demanda
  {path:'home', loadChildren: ()=>import('./home/home.module').then((m)=>m.HomeModule)},
  {path:'animais', loadChildren: ()=>import('./animais/animais.module').then((m)=>m.AnimaisModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
