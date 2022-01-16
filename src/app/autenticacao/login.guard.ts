import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// CanLoad pois rotas estão sendo carregada de modo lazy

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Se já está logado, ao tentar acessar home, redireicona pra pagina de animais
      if(this.usuarioService.estaLogado()) {
        this.router.navigate(['animais']);
        return false;
      }

      return true;
  }
}
