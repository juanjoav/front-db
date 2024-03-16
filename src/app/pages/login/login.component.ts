import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username!: string;
  password!: string;
  user!: Usuario;
  registroForm: FormGroup;

  constructor(private userService: UsersService, private router: Router, private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      username: ['', /*[Validators.required,]*/],
      password: ['', /*Validators.required*/]
    });
  }

  login() {
    console.log(this.registroForm.value);
  
    if (this.registroForm.valid) {
      const userForm: { username: string, password: string } = this.registroForm.value;
  
      this.userService.login(userForm.username, userForm.password).subscribe(
        (response: any) => {
          if(response != null){
            this.router.navigate(['/home/' + response.user.id]);
          }
        },
        (error) => {
          if (error.status === 401) {
            alert("Credenciales incorrectas. Por favor, verifique su email y contraseña.");
            
          } else {
            console.error("Error al iniciar sesión: ", error);
          }
        }
      );

      
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  }

  travel(){
    this.router.navigate(['/home/' + 1]);
  }
}