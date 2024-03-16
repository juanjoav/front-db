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
  imageUrl: any = '';
  fileImg: any = '';

  constructor(private userService: UsersService, private formBuilder: FormBuilder,private router: Router) {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      // address: ['', Validators.required],
      // phone: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      username: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  registrarUsuario() {


    if (this.registroForm.valid) {
      console.log("Datos del usuario:", this.registroForm.value);
      this.userService.uploadImage(this.fileImg).subscribe((response) => {
        const usuario: Usuario = this.registroForm.value;
        usuario.image = response.secure_url;
        this.userService.createUser(usuario).subscribe(
          (response: any) => {
            console.log(response);
            alert("Usuario creado correctamente.");
            this.router.navigate(['/login']);
          }
        );
      });


    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  }

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      const newFile = new File([file], "mi_archivo.jpg", {
        type: "image/jpeg",
      });
      this.fileImg = newFile;
    } else {
      this.imageUrl = null;
    }
  }
}
