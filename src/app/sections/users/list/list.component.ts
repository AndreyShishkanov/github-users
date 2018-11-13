import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import {User} from '@classes/User';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ApolloError} from 'apollo-client';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
    private _onDestroy = new Subject<void>();
    
    title = 'GitHub Users';
    users: User[];
    searchText: string;
    getData: (amount: number, cursor?: string) => Observable<User[]>;
    pending = false;
    
    errorMessage: string;
    
    constructor(private titleService: Title, private usersService: UsersService, private router: Router) {
        this.titleService.setTitle(this.title);
        this.getData = this.usersService.getData();
    }
    
    ngOnInit() {
        this.getData(100).pipe(takeUntil(this._onDestroy)).subscribe(users => {
            if (!this.users) this.users = [];
            this.users.push(...users);
            this.pending = false;
        }, (error: ApolloError) => {
            this.errorMessage = `${error.message}. Input token.`;
        });
    }
    
    goToUser(login: string) {
        this.router.navigate([`/${login}`]);
    }
    
    trackByFn(index: number, item: User) {
        return item.id;
    }
    
    getMoreData(){
        this.pending = true;
        this.getData(100);
    }
    
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
