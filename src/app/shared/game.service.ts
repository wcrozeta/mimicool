import { Injectable } from '@angular/core';
import { Team } from './team.model';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private team1: Team = new Team();
  private team2: Team = new Team();
  private currentPlayerIndex1: number = 0;
  private currentPlayerIndex2: number = 0;
  private isTeam1Turn: boolean = true;
  private rounds = 5;

  constructor() {
    this.team1 = {
      name: 'Azul',
      players: [],
      score: 0,
      rounds: 0
    };

    this.team2 = {
      name: 'Vermelho',
      players: [],
      score: 0,
      rounds: 0
    };

    /*
    this.team1.players.push({ name: 'Will', points: 3, isDone: false });
    this.team1.players.push({ name: 'Andre', points: 3, isDone: false });
    this.team2.players.push({ name: 'Gabi', points: 2, isDone: false });
    this.team2.players.push({ name: 'Jaque', points: 4, isDone: false });
    */
  }

  registerPlayers(playersTeam1: string[], playersTeam2: string[]) {
    this.team1.players = playersTeam1.map(t => { return { name: t, points: 0, isDone: false } });
    this.team2.players = playersTeam2.map(t => { return { name: t, points: 0, isDone: false } });
  }

  get getTeam1() {
    return this.team1;
  }

  get getTeam2() {
    return this.team2;
  }

  startRound(): void {
    this.currentPlayerIndex1 = 0;
    this.currentPlayerIndex2 = 0;
    this.isTeam1Turn = true;
    this.resetPlayers();
  }

  private resetPlayers(): void {
    this.team1.players.forEach(player => player.isDone = false);
    this.team2.players.forEach(player => player.isDone = false);
  }

  getWinner(): Team | undefined {

    if (this.team1.score > this.team2.score) {
      return this.team1;
    } else if (this.team2.score > this.team1.score) {
      return this.team2;
    } else {
      return undefined;
    }
  }

  isGameFinished() {
    console.log(this.team1.rounds, this.team2.rounds, this.rounds);
    return this.team1.rounds >= this.rounds && this.team2.rounds >= this.rounds;
  }

  nextTurn(): void {
    if (this.isTeam1Turn) {

      this.isTeam1Turn = false; // Muda para o time 2
      this.team1.rounds++;

      if (this.team1.players[this.currentPlayerIndex1].isDone) {
        this.currentPlayerIndex1++;
        if (this.currentPlayerIndex1 >= this.team1.players.length) {
          this.currentPlayerIndex1 = 0; // Reseta para o primeiro jogador
        }
      }
    } else {

      this.isTeam1Turn = true; // Muda para o time 1
      this.team2.rounds++;

      if (this.team2.players[this.currentPlayerIndex2].isDone) {
        this.currentPlayerIndex2++;
        if (this.currentPlayerIndex2 >= this.team2.players.length) {
          this.currentPlayerIndex2 = 0; // Reseta para o primeiro jogador
        }
      }
    }
  }

  markCorrectAnswer(points: number = 0): void {
    if (this.isTeam1Turn) {
      this.team1.players[this.currentPlayerIndex1].points += points;
      this.team1.score += points;
      this.team1.players[this.currentPlayerIndex1].isDone = true;
    } else {
      this.team2.players[this.currentPlayerIndex2].points += points;
      this.team2.score += points;
      this.team2.players[this.currentPlayerIndex2].isDone = true;
    }
  }

  getCurrentPlayer(): Player {
    if (this.isTeam1Turn) {
      return this.team1.players[this.currentPlayerIndex1];
    } else {
      return this.team2.players[this.currentPlayerIndex2];
    }
  }

  getPlayersStatus(): string[] {
    const statuses: string[] = [];
    this.team1.players.forEach(player => {
      statuses.push(`${player.name}: ${player.isDone ? 'Fez mímica' : 'Esperando'}`);
    });
    this.team2.players.forEach(player => {
      statuses.push(`${player.name}: ${player.isDone ? 'Fez mímica' : 'Esperando'}`);
    });
    return statuses;
  }

}
