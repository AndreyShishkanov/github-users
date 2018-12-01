import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import {User} from '@classes/User';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, takeUntil, throttleTime} from 'rxjs/operators';
import {ApolloError} from 'apollo-client';
import {NgProgressComponent} from '@ngx-progressbar/core';
import {FormBuilder, FormGroup} from '@angular/forms';

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
    maxUsersOnPage = 1000;
    
    errorMessage: ApolloError;
    
    form: FormGroup;
    
    @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
    
    constructor(private titleService: Title, private usersService: UsersService, private router: Router, private formBuilder: FormBuilder) {
        this.titleService.setTitle(this.title);
        this.getData = this.usersService.makeDataGetter();
        
        this.form = formBuilder.group({
            searchText: null
        });
        
        this.form.get('searchText').valueChanges.pipe(debounceTime(400)).subscribe(value => {
            console.log(`ищем ${value}`);
            this.searchText = value;
        });
    }
    
    ngOnInit() {
        this.getData(this.maxUsersOnPage).pipe(takeUntil(this._onDestroy)).subscribe(users => {
            if (!this.users) this.users = [];
            this.users.push(...users);
            
            this.pending = false;
            this.progressBar.set(this.users.length * 100 / this.maxUsersOnPage);
            if (this.users.length === this.maxUsersOnPage) this.progressBar.complete();
        }, (error: ApolloError) => {
            this.errorMessage = error;
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
        this.getData(this.maxUsersOnPage);
    }
    
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
