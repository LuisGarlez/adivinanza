import { Component, OnInit } from '@angular/core'; 
import { GameApiService } from '../services/game-api.service'; 
 
@Component({ 
  selector: 'app-leaderboard', 
  templateUrl: './leaderboard.page.html', 
  styleUrls: ['./leaderboard.page.scss'], 
}) 
export class LeaderboardPage implements OnInit { 
 
  players: leaderboardItem[] = []; 
 
  constructor( 
    private api: GameApiService 
  ) { } 
 
  async ngOnInit() { 
    this.players = await this.api.leaderboard(); 
  } 
} 
 
interface leaderboardItem { 
  usuario: string; 
  puntos: number; 
  partidas_jugadas: number; 
}
