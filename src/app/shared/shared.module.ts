import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInputComponent } from './token-input/token-input.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TokenInputComponent
    ],
    declarations: [
        TokenInputComponent
    ]
})
export class SharedModule { }
