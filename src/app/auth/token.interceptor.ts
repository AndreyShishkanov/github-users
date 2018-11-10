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
                Authorization: `bearer 86149e206c18790cd9f1862a2729472ceb32ffc3`
            }
        });
        return next.handle(request);
    }
}
