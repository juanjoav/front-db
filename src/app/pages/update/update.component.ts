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
  user: Usuario = {
    id: 0,
    name: '',
    lastName: '',
    // address: '',
    // phone: '',
    // email: '',
    password: '',
    dateOfBirth: '',
    image: '',
    username: ''
  };

  constructor(private userService: UsersService, private formBuilder: FormBuilder,private router: Router, private route: ActivatedRoute) {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log('Cargar datos');
     this.route.params.subscribe(params => {
      const id = +params['id'];
      this.userService.getUserById(id).subscribe((user) => {
        this.user = user;
        console.log(user);
        this.registroForm.patchValue({
          name: this.user.name,
          lastName: this.user.lastName,
          // address: this.user.address,
          // phone: this.user.phone,
          // email: this.user.email,
        })
      });

    });

  }

  update(){
    this.user.name = this.registroForm.get('name')?.value;
    this.user.lastName = this.registroForm.get('lastName')?.value;
    // this.user.address = this.registroForm.get('address')?.value;
    // this.user.phone = this.registroForm.get('phone')?.value;
    // this.user.email = this.registroForm.get('email')?.value;
    this.user.password = this.registroForm.get('password')?.value;
    this.userService.updateUser(this.user.id!,this.user).subscribe((user) => {
      console.log(user);
      this.router.navigate(['/home/' + this.user.id]);
    });
  }


  cancel(){
    this.router.navigate(['/home/' + this.user.id]);
  }


}
