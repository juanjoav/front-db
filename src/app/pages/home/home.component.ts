import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Usuario } from '../../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isDeleteModalVisible = false;
  usuario: Usuario = {
    id: 0,
    name: '',
    lastName: '',
    // address: '',
    // phone: '',
    // email: '',
    username: '',
    password: '',
    dateOfBirth: '',
    image: ''
  };

  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    console.log('Cargar datos');
     this.route.params.subscribe(params => {
      const id = +params['id'];
      this.userService.getUserById(id).subscribe((user) => {
        this.usuario = user;
        console.log("Seteado -> ", this.usuario);
        const fullName = ''+ this.usuario.name + '' + this.usuario.lastName;
        const letterCount = this.countLetters(fullName);
        console.log(letterCount);
      });

    });

  }

  toggleDeleteModal() {
    this.isDeleteModalVisible = !this.isDeleteModalVisible;
  }

  editarUsuario() {
    this.router.navigate(['/edit/' + this.usuario.id]);
  }

  eliminarUsuario() {
    this.toggleDeleteModal();
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  countLetters(name: string): void {
    const letterMap: { [key: string]: number } = {};

    function countLettersRecursive(str: string): void {
      if (str.length === 0) {
        return;
      }

      const firstLetter = str[0].toLowerCase();

      if (letterMap[firstLetter]) {
        letterMap[firstLetter]++;
      } else {
        letterMap[firstLetter] = 1;
      }
      countLettersRecursive(str.slice(1));
    }

    countLettersRecursive(name);

    for (const letter in letterMap) {
      if (letterMap.hasOwnProperty(letter)) {
        console.log(`${letter}: ${letterMap[letter]}`);
      }
    }
  }

}
