import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { RolService } from '../../services/rol.service';
import { Roles } from '../../models/roles';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registroForm: FormGroup;
  imageUrl: any = '';
  fileImg: any = '';
  selectedOptions = [];
  rolesDisponibles: Roles[] = [];

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private router: Router, private rolService: RolService) {
    this.loadRoles();
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required],
      image: [''],
      roles: this.formBuilder.array([])
    });
  }

  registrarUsuario() {

    if (this.registroForm.valid) {
      const selectedRoles = this.registroForm.value.roles
      .map((checked: boolean, i: number) => checked ? this.rolesDisponibles[i] : null)
      .filter((rol: Roles | null) => rol !== null);
      console.log("Roles seleccionados:", selectedRoles);
    
      this.userService.uploadImage(this.fileImg).subscribe((response) => {
        const usuario: Usuario = this.registroForm.value;
        usuario.image = response.secure_url;
        usuario.roles = selectedRoles;
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

  loadRoles() {
    this.rolService.getAllRols().subscribe((response: Roles[]) => {
      this.rolesDisponibles = response;
      const rolesFormArray = this.registroForm.get('roles') as FormArray;
      this.rolesDisponibles.forEach(() => {
        rolesFormArray.push(this.formBuilder.control(false));
      });
    });
  }
}
