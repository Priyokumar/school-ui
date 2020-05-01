import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.url.includes('login')) {
            return next.handle(req);
        }

        const authToken = `Bearer ${this.authService.getUserToken()}`;

        const authReq = req.clone({ setHeaders: { Authorization: authToken } });

        return next.handle(authReq);
    }
}

