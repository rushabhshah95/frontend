/* A Moment Featue Module */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddMomentComponent } from './add-moment/add-moment.component';
import { ListMomentComponent } from './list-moment/list-moment.component';
import { MaterialModule } from '../../../app/material.module';
import { momentRoutes } from './moment.routes';

@NgModule({
  declarations: [AddMomentComponent, ListMomentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(momentRoutes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class MomentModule { }
