import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import {User} from '@classes/Query';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit, OnDestroy {
    private _onDestroy = new Subject<void>();
    
    user: User;
    
    constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, public tableService: UsersService) {
        const login = this.route.snapshot.paramMap.get('login');
        this.titleService.setTitle(login);
        
        this.tableService.getUserByLogin(login).subscribe(user => {
            this.user = user;
        });
    }
    
    ngOnInit() {
    
    }
    
    returnBack() {
        this.router.navigate(['..'], { relativeTo: this.route });
    }
    
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
