import { Component, OnInit } from '@angular/core';
import { GameApiService } from '../services/game-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  numero: number | null = null; // Número ingresado por el usuario
  mensaje: string = ''; // Mensaje de feedback para el usuario
  mensajeError: string = ''; // Mensaje de error para validaciones
  intentosRestantes: number = 10; // Número de intentos disponibles
  bloquearInput: boolean = false; // Bloquear input tras ganar o perder

  constructor(private api: GameApiService) {}

  ngOnInit() {}

  validarNumero() {
    // Validar que el número esté dentro del rango permitido
    if (!this.numero || this.numero < 1 || this.numero > 100) {
      this.mensajeError = 'Por favor, ingresa un número válido entre 1 y 100.';
      return false;
    }
    this.mensajeError = '';
    return true;
  }

  async onClickAdivinar() {
    if (!this.validarNumero() || this.bloquearInput) {
      return;
    }

    try {
      const numeroAdivinado = Number(this.numero); // Asegurar que sea un número válido
      const data = await this.api.guess(numeroAdivinado);
      this.mensaje = data.message;
      this.intentosRestantes--;

      // Bloquear input si el usuario acierta o agota intentos
      if (data.success || this.intentosRestantes <= 0) {
        this.bloquearInput = true;
        if (!data.success) {
          this.mensaje += ' Se acabaron los intentos.';
        }
      }
    } catch (error: any) {
      this.mensaje = error?.message || 'Ocurrió un error inesperado.';
    }
  }

  async onClickReiniciar() {
    try {
      await this.api.restart();
      // Reiniciar el estado del juego
      this.numero = null;
      this.mensaje = '';
      this.mensajeError = '';
      this.intentosRestantes = 10;
      this.bloquearInput = false;
    } catch (error: any) {
      this.mensaje = error?.message || 'Error al reiniciar el juego.';
    }
  }

  ionViewWillLeave() {
    // Eliminar el token al salir
    localStorage.removeItem('token');
  }
}
