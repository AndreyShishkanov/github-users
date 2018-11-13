import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import {User} from '@classes/User';
import {ApolloError} from 'apollo-client';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html'
})
export class CardComponent {
    user: User;
    
    errorMessage: string;
    
    constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, public usersService: UsersService) {
        const login = this.route.snapshot.paramMap.get('login');
        
        this.titleService.setTitle(login);
        
        this.usersService.getUserByLogin(login).subscribe(user => {
            this.user = user;
        }, (error: ApolloError) => {
            this.errorMessage = `${error.message}. Input token.`;
        });
    }
    
    returnBack() {
        this.router.navigate(['..']);
    }
}
