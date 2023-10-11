import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideogamesComponent } from './videogames/videogames.component';
import { AddVideogameComponent } from './add-videogame/add-videogame.component';
import { UpdateVideogameComponent } from './update-videogame/update-videogame.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VideogameGuard } from './videogame.guard';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
const routes: Routes = [
  {path: "videogames", component : VideogamesComponent},
  //{path: "add-videogame", component : AddVideogameComponent},
  { path: "", redirectTo: "videogames", pathMatch: "full" },
  {path: "updateVideogame/:id", component: UpdateVideogameComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path : "add-videogame", component : AddVideogameComponent, canActivate:[VideogameGuard]},
  {path : "rechercheParGenre",component : RechercheParGenreComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeGenres", component : ListeGenresComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
