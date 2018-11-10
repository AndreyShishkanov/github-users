import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor() {
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        request = request.clone({
            setHeaders: {
                // hardcode
                Authorization: `bearer b5687ae81129dd67ce91ed6519691bd213a0a37e`
            }
        });
        return next.handle(request);
    }
}
