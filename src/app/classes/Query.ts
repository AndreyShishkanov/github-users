import {User} from '@classes/User';

export interface Query {
    search: Search;
    user: User;
}

export interface Search {
    edges: Item[];
    pageInfo: PageInfo;
}

export interface Item {
    node: User;
}

export interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
}
