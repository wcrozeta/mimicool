import { Component } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';  // Importar as funções necessárias

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

  addName(): void {
    if (this.nameInput.trim() !== '') {
      this.names.push(this.nameInput.trim());
      this.nameInput = '';  // Limpar o campo de input
    }
  }

  divideTeams(): void {
    if (this.names.length < 2) {
      alert('É necessário adicionar pelo menos duas pessoas para dividir em times!');
      return;
    }

    this.team1 = [];
    this.team2 = [];

    // Dividir os nomes em dois times de forma alternada
    this.names.forEach((name, index) => {
      if (index % 2 === 0) {
        this.team1.push(name);
      } else {
        this.team2.push(name);
      }
    });
  }

  resetTeams(): void {
    this.names = [];
    this.team1 = [];
    this.team2 = [];
    this.nameInput = '';
  }

  // Função chamada quando o item é movido entre os times
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
  }
}
