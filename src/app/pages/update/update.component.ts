import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent {
  registroForm: FormGroup;
  imageUrl: any = '';
  fileImg: any = '';

  user: Usuario = {
    id: 0,
    name: '',
    lastName: '',
    password: '',
    birthDate: '',
    image: '',
    username: ''
  };

  constructor(private userService: UsersService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: ['', Validators.required],
      image: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.userService.getUserById(id).subscribe((user) => {
        this.user = user;
        this.registroForm.patchValue({
          name: this.user.name,
          lastName: this.user.lastName,
          birthDate: this.user.birthDate,
          username: this.user.username,
          image: this.user.image,
          password: this.user.password
        })
      });

    });

  }

  update() {
    this.user.name = this.registroForm.get('name')?.value;
    this.user.lastName = this.registroForm.get('lastName')?.value;
    this.user.birthDate = this.registroForm.get('birthDate')?.value;
    this.user.username = this.registroForm.get('username')?.value;
    this.user.image = this.registroForm.get('image')?.value;
    this.user.password = this.registroForm.get('password')?.value;

    if (this.fileImg != '') {
      this.userService.uploadImage(this.fileImg).subscribe((response) => {
        this.user.image = response.secure_url;
        this.userService.updateUser(this.user.id!, this.user).subscribe((user) => {
          this.router.navigate(['/home/' + this.user.id]);
        });
      })
    } else {
      this.userService.updateUser(this.user.id!, this.user).subscribe((user) => {
        this.router.navigate(['/home/' + this.user.id]);
      });
    }
  }


  cancel() {
    this.router.navigate(['/home/' + this.user.id]);
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
