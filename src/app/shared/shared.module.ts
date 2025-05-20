import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from '../features/movies/components/shared/rating/rating.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ModalWrapperComponent } from './components/modal-wrapper/modal-wrapper.component';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    WrapperComponent,
    HeaderComponent,
    RatingComponent,
    ModalWrapperComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  exports: [
    InputFieldComponent,
    RatingComponent,
    WrapperComponent,
    HeaderComponent,
    ModalWrapperComponent,
  ],
})
export class SharedModule {}
