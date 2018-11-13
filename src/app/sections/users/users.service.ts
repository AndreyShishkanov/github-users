import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Query, Search} from '@classes/Query';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';
import {map, tap} from 'rxjs/operators';
import {User} from '@classes/User';
import {ApolloError} from 'apollo-client';

@Injectable()
export class UsersService {
    
    itemsOnPage = 100;
    // cursor: string = null;
    
    private users$: Subject<User[]> = new Subject();
    
    usersQuery: QueryRef<Query> = gql`
        query($after:String, $first:Int!){
          search(query: "type:user", after: $after, first: $first, type: USER) {
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
                  avatarUrl(size:30),
                  email,
                  isHireable,
                  createdAt
                }
              }
            }
          }
        }
    `;
    
    constructor(private apollo: Apollo) {
    
    }
    
    // getData(amount: number): Observable<User[]> {
    //     this.apollo.watchQuery<Query>({
    //             query: this.usersQuery,
    //             variables: {
    //                 after: this.cursor,
    //                 first: amount > this.itemsOnPage ? 100 : this.itemsOnPage
    //             }
    //         })
    //         .valueChanges.pipe(map(x => x.data)).subscribe(response => {
    //             this.users$.next(response.search.edges.map(x => x.node));
    //
    //             amount = amount - 100;
    //             this.cursor = response.search.pageInfo.endCursor;
    //
    //             if (amount > 0) {
    //                 this.getData(amount).subscribe();
    //             }
    //         }
    //     );
    //     return this.users$.asObservable();
    // }
    
    getData(): (amount: number, cursor?: string) => Observable<User[]> {
        let cursor: string;
        
        const that = this;
        
        return function fetch(amount: number, _cursor: string = null): Observable<User[]> {
            that.apollo.watchQuery<Query>({
                    query: that.usersQuery,
                    variables: {
                        after: _cursor ? _cursor : cursor,
                        first: amount > that.itemsOnPage ? 100 : that.itemsOnPage
                    }
                })
                .valueChanges.pipe(map(x => x.data)).subscribe(response => {
                    that.users$.next(response.search.edges.map(x => x.node));
                    
                    amount = amount - 100;
                    cursor = response.search.pageInfo.endCursor;
                    
                    if (amount > 0) {
                        fetch(amount, cursor).subscribe();
                    }
                }, (error: ApolloError) => {
                    that.users$.error(error);
                }
            );
            return that.users$.asObservable();
        };
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
                            bio,
                            avatarUrl,
                            email,
                            createdAt,
                            location,
                            company,
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
