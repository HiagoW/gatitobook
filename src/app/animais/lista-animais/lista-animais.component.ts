import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  // $ convenção para indicar que é observable
  animais !: Animais;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.animais = this.activatedRoute.snapshot.data['animais'];
    })


    // Agora é feito pelo resolver:

    // Usando rxjs para evitar subscribe dentro de subscribe
    // Usando pipe async, verificar o componente de lista-animais. Angular gerencia ciclo de vida do Observable.

    // this.animais$ = this.usuarioService.retornaUsuario().pipe(

    // switchMap troca o fluxo das informações, dos dados do usuario para uma lista de animais

      // switchMap((usuario) => {
        // const userName = usuario.name ?? '';
        // return this.animaisService.listaDoUsuario(userName);
      // })
    // );
  }

}
