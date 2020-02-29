import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

//this interceptor needs to be injected for the full application--core module
//the HttpInterceptor method requires us to implement the 'intercept' method
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { //HttpHandler object which will give a special method to execute and let a request continue it's journey
        console.log('Intercepted!', req);
        const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())}); //we can not modify a request directly -- requests are immutable -- clone allows us to modify the copy directly   
        return next.handle(copiedReq);
    }
}