import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private userService: UsersService, private formBuilder: FormBuilder,private router: Router) { 
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registrarUsuario() {


    if (this.registroForm.valid) {
      console.log("Datos del usuario:", this.registroForm.value);
      const usuario: Usuario = this.registroForm.value;
      this.userService.createUser(usuario).subscribe(
        (response: any) => {
          console.log(response);
          alert("Usuario creado correctamente.");
          this.router.navigate(['/login']);
        }
      );
      

    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  }

}
