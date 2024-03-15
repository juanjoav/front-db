import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

 @Output() onConfirm = new EventEmitter<boolean>();
 @Input() usuario!: number;

  constructor(private usersService: UsersService, private router: Router) { }

  confirm() {
    
    this.usersService.deleteUser(this.usuario).subscribe(() => {
      this.router.navigate(['/login']);
      this.usersService.logout();
      this.onConfirm.emit(true);
    });
  }

  cancel() {
    this.onConfirm.emit(false);
  }

}
