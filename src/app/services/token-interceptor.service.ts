import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs'; 

@Injectable({providedIn: 'root'}) 
export class TokenInterceptorService implements HttpInterceptor { 

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

const token = localStorage.getItem('token')?.toString() || ''; 

request = request.clone({ 
headers: request.headers 
.set('Accept', 'application/json') 
.set('Authorization', `Bearer ${token}`) 
}); 

return next.handle(request); 
} 

} 