import {User} from '@classes/User';

export interface Query {
    search: Search;
    user: User;
}

export interface Search {
    edges: Item[];
}

export interface Item {
    node: User;
}
