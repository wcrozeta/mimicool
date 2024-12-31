import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WordDrawComponent } from './word-draw/word-draw.component';
import { CreateTeamsComponent } from './create-teams/create-teams.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component'; // Importar a tela inicial

const routes: Routes = [
  { path: '', component: HomeComponent }, // Definir a rota inicial (Home)
  { path: 'create-teams', component: CreateTeamsComponent }, // Rota para a tela de criação de times
  { path: 'word-draw', component: WordDrawComponent }, // Rota para a tela de criação de times
  { path: 'results', component: ResultsComponent }, // Rota para a tela de criação de times
];

@NgModule({
  declarations: [
    AppComponent,
    WordDrawComponent,
    CreateTeamsComponent,
    HomeComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // Configurar as rotas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
