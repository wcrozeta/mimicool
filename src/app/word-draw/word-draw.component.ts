import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-word-draw',
  templateUrl: './word-draw.component.html',
  styleUrls: ['./word-draw.component.css']
})
export class WordDrawComponent implements OnInit, OnDestroy {
  gistUrl: string = 'https://gist.githubusercontent.com/wcrozeta/3996e1361fbaa339c2f2c1358aa46745/raw/57c4365380affb48f004dddd6c73a841861e1572/palavras'; // Substitua pela URL "raw" do Gist
  originalWords: string[] = [];
  remainingWords: string[] = [];
  selectedWords: string[] = [];
  loading: boolean = false;
  error: string | null = null;

  timer: number = 60; // Tempo em segundos
  timerInterval: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWords();
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
      this.selectedWords.push(word);
    }

    this.resetTimer(); // Reinicia o timer após o sorteio
  }

  resetWords(): void {
    this.remainingWords = [...this.originalWords];
    this.selectedWords = [];
    this.resetTimer();
  }

  startTimer(): void {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.clearTimer();
        alert('Tempo esgotado! Faça um novo sorteio.');
        this.resetWords();
      }
    }, 1000);
  }

  resetTimer(): void {
    this.timer = 60; // Reinicia o timer para 60 segundos
    this.startTimer();
  }

  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
