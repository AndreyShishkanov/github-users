import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Query, Search} from '@classes/Query';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {User} from '@classes/User';

@Injectable()
export class UsersService {
    
    constructor(private apollo: Apollo) {
    
    }
    
    getData(): Observable<Search> {
        return this.apollo
            .watchQuery<Query>({
                query: gql`
                    {
                        search(query: "type:user", first: 100, type: USER) {
                            userCount
                            pageInfo {
                                endCursor
                                hasNextPage
                            }
                            edges {
                                node {
                                    ... on User {
                                        id,
                                        login
                                        name,
                                        bio
                                    }
                                }
                            }
                        }
                    }
                `,
            })
            .valueChanges.pipe(map(x => x.data.search));
    }
    
    getUserByLogin(login: string): Observable<User> {
        return this.apollo
            .watchQuery<Query>({
                query: gql`
                    {
                        user(login: "${login}") {
                            name,
                            login,
                            bioHTML,
                            avatarUrl,
                            email,
                            createdAt,
                            location,
                            companyHTML,
                            isHireable,
                            resourcePath
                        }
                    }
                `,
            })
            .valueChanges.pipe(map(x => x.data.user));
    }
}
