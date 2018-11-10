import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import {routing} from './users.routing';
import {UsersService} from './users.service';

@NgModule({
    imports: [
        CommonModule,
        routing,
    ],
    declarations: [ListComponent, CardComponent],
    exports: [ListComponent, CardComponent],
    providers: [UsersService]
    
})
export class UsersModule { }
