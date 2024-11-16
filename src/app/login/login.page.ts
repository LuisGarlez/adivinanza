import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { GameApiService } from '../services/game-api.service'; 
 
@Component({ 
  selector: 'app-login', 
  templateUrl: './login.page.html', 
  styleUrls: ['./login.page.scss'], 
}) 
export class LoginPage implements OnInit { 
 
  usuario: string = ''; 
  password: string = ''; 
 
  constructor( 
    private router: Router, 
    private api: GameApiService 
  ) { } 
 
  ngOnInit() {} 
 
  async onClickIngresar(form: NgForm) { 
    if(form.invalid) { 
      console.log('Debes completar todos los campos'); 
      return; 
    } 
 
    await this.api.login(this.usuario, this.password) 
      .then(() => this.router.navigate(['/menu'])) 
      .catch(data => console.error('LOGIN:', data.error.message)); 
  } 
} 
