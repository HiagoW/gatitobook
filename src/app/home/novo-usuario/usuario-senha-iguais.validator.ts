import { FormGroup } from "@angular/forms";

export function usuarioSenhaIguaisValidator(formGroup:FormGroup) {
  // ?? -> verifica se é undefined
  const username = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  // Verifica se ambos estão vazio
  if (username.trim() + password.trim()) {
    return username !== password ? null : {senhaIgualUsuario:true};
  } else {
    return null;
  }
};
