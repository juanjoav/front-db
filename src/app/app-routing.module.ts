import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { UpdateComponent } from './pages/update/update.component';
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'home/:email', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'edit/:id', component: UpdateComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
