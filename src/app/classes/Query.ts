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

export interface User {
    login: string;
    name: string;
    bio: string;
    createdAt: Date;
}
