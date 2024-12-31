import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../shared/game.service';
import { Player } from '../shared/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-word-draw',
  templateUrl: './word-draw.component.html',
  styleUrls: ['./word-draw.component.css']
})
export class WordDrawComponent implements OnInit, OnDestroy {
  gistUrl: string = 'https://gist.githubusercontent.com/wcrozeta/3996e1361fbaa339c2f2c1358aa46745/raw/57c4365380affb48f004dddd6c73a841861e1572/palavras'; // Substitua pela URL "raw" do Gist
  originalWords: string[] = [];
  remainingWords: string[] = [];
  selectedWords: any[] = [];
  loading: boolean = false;
  error: string | null = null;

  private TEMPO: number = 80;
  gameStarted = false;
  currentPlayer: Player = new Player;
  timer: number = this.TEMPO;
  timerInterval: any;

  constructor(private http: HttpClient, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.fetchWords();
    this.gameService.startRound();
    this.currentPlayer = this.gameService.getCurrentPlayer();

    if (!this.currentPlayer) {
      this.router.navigate(['/create-teams']);
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  fetchWords(): void {
    this.loading = true;
    this.http.get(this.gistUrl, { responseType: 'text' }).subscribe({
      next: (data) => {
        this.originalWords = data.split('\n').map(word => word.trim()).filter(word => word !== '');
        this.remainingWords = [...this.originalWords];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar palavras do Gist.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  drawWords(): void {
    if (this.remainingWords.length < 5) {
      alert('Não há palavras suficientes para um novo sorteio. Reiniciando a lista!');
      this.resetWords();
    }

    this.selectedWords = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * this.remainingWords.length);
      const word = this.remainingWords.splice(randomIndex, 1)[0];
      this.selectedWords.push({ text: word, isChecked: false });
    }

    this.resetTimer();
  }

  resetWords(): void {
    this.remainingWords = [...this.originalWords];
    this.selectedWords = [];
    this.resetTimer();
    this.gameStarted = false;
  }

  startTimer(): void {
    this.gameStarted = true;
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timer = this.TEMPO;
  }

  isGameFinished() {
    return this.gameService.isGameFinished();
  }

  callNextTeam() {

    const pontos = this.selectedWords.filter(word => word.isChecked).length;
    this.gameService.markCorrectAnswer(pontos);
    this.gameService.nextTurn();
    this.resetWords();

    if (this.isGameFinished()) {
      this.router.navigate(['/results']);
    } else {
      this.currentPlayer = this.gameService.getCurrentPlayer();
      console.log(this.currentPlayer)
    }
  }

  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
