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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.registroForm.value);
  
    if (this.registroForm.valid) {
      const userForm: { email: string, password: string } = this.registroForm.value;
  
      this.userService.login(userForm.email, userForm.password).subscribe(
        (response: any) => {
          this.userService.getUserByEmail(userForm.email).subscribe(
            (user) => {
              this.user = user;
              console.log("Usuario -> ", user);
              
              this.router.navigate(['/home/' + this.user.id]);
            },
            (error) => {
              console.error("Error al obtener el usuario: ", error);
            }
          );
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
}