import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  // !: -> Como vai ser instanciado no ngOnInit, a ! serve para evitar que dê erro de compilação pela verificação do TypeScript
  novoUsuarioForm!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private novoUsuarioService:NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService,
    private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      // primeiro array: Validação sícrona. Segundo: Validação assíncrona
      userName: ['', [minusculoValidator],[this.usuarioExistenteService.usuarioJaExiste()]],
      password: ['']
    }, {
      validators:[usuarioSenhaIguaisValidator]
    }
    );
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      // Permite fazer cast pois nomes dos campos são iguais
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {
        this.router.navigate(['']);
      },
        (error) => {console.log(error);}
      );
    }
  }

}
