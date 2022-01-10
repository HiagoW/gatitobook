import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  // !: -> Como vai ser instanciado no ngOnInit, a ! serve para evitar que dê erro de compilação pela verificação do TypeScript
  novoUsuarioForm!:FormGroup;

  constructor(private formBuilder:FormBuilder, private novoUsuarioService:NovoUsuarioService) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: [''],
      password: ['']
    });
  }

  cadastrar() {
    // Permite fazer cast pois nomes dos campos são iguais
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario);
  }

}
