import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {UsersService} from '../users.service';
import {User} from '@classes/Query';
import {Router} from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    
    title = 'GitHub Users';
    users: User[];
    
    constructor(private titleService: Title, private tableService: UsersService, private router: Router) {
        this.titleService.setTitle(this.title);
    
        this.tableService.getData().subscribe(result => {
                this.users = result.edges.map(x => x.node);
        });
    }
    
    ngOnInit() {
    
    }
    
    goToUser(login: string) {
        this.router.navigate([`/${login}`]);
    }
}
