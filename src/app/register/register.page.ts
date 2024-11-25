import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  usuario: string = '';
  correo: string = '';
  password: string = '';
  mensajeError: string = ''; // Mensaje de error para feedback
  registroExitoso: boolean = false; // Indicador de éxito del registro

  constructor(
    private router: Router,
    private api: GameApiService
  ) { }

  ngOnInit() {}

  async onClickRegistrar(form: NgForm) {
    if (form.invalid) {
      this.mensajeError = 'Debes completar todos los campos correctamente.';
      return;
    }

    try {
      await this.api.register(this.correo, this.usuario, this.password);
      this.registroExitoso = true;
      this.mensajeError = ''; // Limpiar mensaje de error
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Redirigir después de 2 segundos
    } catch (err: any) {
      // Manejo robusto de errores
      this.mensajeError = err?.error?.message || err?.message || 'Error inesperado. Por favor, intenta de nuevo.';
      this.registroExitoso = false;
    } finally {
      // Eliminar token si es necesario
      localStorage.removeItem('token');
    }
  }
}
