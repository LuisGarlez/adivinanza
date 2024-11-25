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
  mensajeError: string = ''; // Mensaje para feedback en errores
  loginExitoso: boolean = false; // Indicador de éxito en el login

  constructor(
    private router: Router,
    private api: GameApiService
  ) { }

  ngOnInit() {}

  async onClickIngresar(form: NgForm) {
    if (form.invalid) {
      this.mensajeError = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    try {
      // Intentar iniciar sesión
      const respuesta = await this.api.login(this.usuario, this.password);

      // Almacenar token (si aplica)
      localStorage.setItem('token', respuesta.token);

      // Feedback y redirección
      this.mensajeError = '';
      this.loginExitoso = true;
      setTimeout(() => this.router.navigate(['/menu']), 2000);
    } catch (err: any) {
      // Manejo robusto de errores
      this.mensajeError = err?.error?.message || err?.message || 'Error inesperado. Por favor, intenta de nuevo.';
      this.loginExitoso = false;
    } finally {
      // Asegurarse de eliminar token en caso de error previo
      if (!this.loginExitoso) {
        localStorage.removeItem('token');
      }
    }
  }
}
