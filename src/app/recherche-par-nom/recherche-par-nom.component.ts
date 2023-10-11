import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { Videogame } from '../model/videogame.model';
import { AuthService } from '../services/auth.service';
import { VideogameService } from '../services/videogame.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: []
})
export class RechercheParNomComponent implements OnInit {
  nomVideogame! : string ;
  searchTerm!: string;
  allVideogames! : Videogame[];
  videogames! : Videogame[];
  IdGenre! : number ;
  genres! : Genre[];
  constructor(private videogameService : VideogameService,public authService: AuthService) { }

  ngOnInit(): void {
    this.videogameService.listeVideogames().subscribe(vid => {console.log(vid);
    this.allVideogames = vid;})
  }
  rechercherVids(){
    this.videogameService.rechercherParNom(this.nomVideogame).
    subscribe( vid => {
    this.videogames = vid; 
    console.log(vid)});
    }

    onKeyUp(filterText : string){
      this.videogames= this.allVideogames.filter(item =>
      item.nomVideogame!.toLowerCase().includes(filterText));
      }
      supprimerVideogame(v: Videogame){
        let conf = confirm("Do you really want to delete this game ?");
        if (conf)
        this.videogameService.supprimerVideogame(v.idVideogame!).subscribe(() => {
          console.log("Jeu supprimé");
          this.ngOnInit();
        });
      }
}
