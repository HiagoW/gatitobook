import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Animais } from '../animais';

@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(private animaisService: AnimaisService, private usuarioService: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      }),
      // Indica para finalizar fluxo após switchMap, pois usuarioService.retornaUsuario é Observable do tipo subject.
      // Enquanto tiver um .next, observable continuará aberto
      take(1)
    );
  }
}
