// HTTP INTERCEPTOR to attach in request header while interacting with backend

import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
                Authorization: `JWT $[accessToken}` 
            }
        });
        return next.handle(req);
    }
}