import { Component } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Team } from '../shared/team.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  winner: Team | undefined;
  team1: Team;
  team2: Team;

  teams: Team[] = [];

  constructor(private gameService: GameService) {
    this.team1 = this.gameService.getTeam1;
    this.team2 = this.gameService.getTeam2;

    this.winner = this.gameService.getWinner();

    if (this.winner?.name === this.team1.name) {
      this.teams.push(this.team1);
      this.teams.push(this.team2);
    } else {
      this.teams.push(this.team2);
      this.teams.push(this.team1);
    }
  }

  getPlayers(): { name: string; team: string; score: number }[] {
    const players = [
      ...this.team1.players.map(player => ({ name: player.name, team: this.team1.name, score: player.points })),
      ...this.team2.players.map(player => ({ name: player.name, team: this.team2.name, score: player.points }))
    ];

    return players.sort((a, b) => a.score > b.score ? -1 : 1);
  }
}
