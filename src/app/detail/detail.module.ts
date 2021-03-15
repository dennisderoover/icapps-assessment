import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [DetailComponent],
  exports: [DetailComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatIconModule
  ]
})
export class DetailModule { }
