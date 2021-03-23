import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../app/sign-up/sign-up.component';
import { LoginComponent } from '../app/log-in/log-in.component';
import { AuthGuard } from '../app/authGuard/auth.guard';

const routes: Routes = [
  {path:'', component:SignUpComponent, pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'user', loadChildren: () => import('src/app/module/moment/moment.module').then(m => m.MomentModule), canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
