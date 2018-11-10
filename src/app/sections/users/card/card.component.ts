import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import {User} from '@classes/User';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html'
})
export class CardComponent {
    user: User;
    
    constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, public tableService: UsersService) {
        const login = this.route.snapshot.paramMap.get('login');
        
        this.titleService.setTitle(login);
        
        this.tableService.getUserByLogin(login).subscribe(user => {
            this.user = user;
        });
    }
    
    returnBack() {
        this.router.navigate(['..']);
    }
}
