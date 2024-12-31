import { Component } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';  // Importar as funções necessárias
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-create-teams',
  templateUrl: './create-teams.component.html',
  styleUrls: ['./create-teams.component.css']
})
export class CreateTeamsComponent {

  names: string[] = [];
  team1: string[] = [];
  team2: string[] = [];
  nameInput: string = '';

  constructor(private gameService: GameService) {

  }

  get getTeam1() {
    return this.gameService.getTeam1;
  }

  get getTeam2() {
    return this.gameService.getTeam2;
  }

  addName(): void {
    if (this.nameInput.trim() !== '') {
      this.names.push(this.nameInput.trim());
      this.nameInput = '';
    }
  }

  divideTeams(): void {
    this.names = this.shuffleArray([...this.names]);

    this.team1 = [];
    this.team2 = [];

    this.names.forEach((name, index) => {
      if (index % 2 === 0) {
        this.team1.push(name);
      } else {
        this.team2.push(name);
      }
    });

    this.gameService.registerPlayers(this.team1, this.team2);
  }

  resetTeams(): void {
    this.names = [];
    this.team1 = [];
    this.team2 = [];
    this.nameInput = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousContainer = event.previousContainer;  // Lista original
    const currentContainer = event.container;  // Lista de destino

    // Verificar se a lista de origem é diferente da de destino
    if (previousContainer === currentContainer) {
      // Se o item foi arrastado dentro da mesma lista, mover dentro da lista
      moveItemInArray(previousContainer.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousIndex);
      console.log(event.currentIndex);
      // Se o item foi movido de uma lista para outra
      const item = previousContainer.data[event.previousIndex];

      // Remover o item da lista de origem
      previousContainer.data.splice(event.previousIndex, 1);

      // Adicionar o item à lista de destino
      currentContainer.data.splice(event.currentIndex, 0, item);
    }

    this.gameService.registerPlayers(this.team1, this.team2);
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));


      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}
