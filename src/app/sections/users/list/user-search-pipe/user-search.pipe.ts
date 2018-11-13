import {Pipe, PipeTransform} from '@angular/core';
import {User} from '@classes/User';

@Pipe({
    name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {
    
    transform(users: User[], searchText: string): User[] {
        if (!users) return [];
        if (!searchText) return users;
    
        searchText = searchText.toLowerCase();
        
        const searchPieces = searchText.split(' ').filter(x => x);
        
        return users.filter( user => {
            return searchPieces.every(text => user.name && user.name.toLowerCase().includes(text))
                || searchPieces.every(text => user.login && user.login.toLowerCase().includes(text))
                || searchPieces.every(text => user.email && user.email.toLowerCase().includes(text));
        });
    }
}
