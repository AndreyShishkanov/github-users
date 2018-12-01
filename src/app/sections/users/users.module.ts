import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {CardComponent} from './card/card.component';
import {routing} from './users.routing';
import {UsersService} from './users.service';
import {UserSearchPipe} from './list/user-search-pipe/user-search.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgProgressModule} from '@ngx-progressbar/core';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        routing,
        InfiniteScrollModule,
        NgProgressModule.forRoot()
    ],
    declarations: [ListComponent, CardComponent, UserSearchPipe],
    exports: [ListComponent, CardComponent],
    providers: [UsersService]
    
})
export class UsersModule { }
