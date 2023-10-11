import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styleUrls: []
})
export class UpdateGenreComponent implements OnInit {
  @Input()
  genre! : Genre ;
  @Output()
  genreUpdated = new EventEmitter<Genre>();

  @Input()
  ajout!:boolean;
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdatedGenre",this.genre);
  }

  saveGenre(){
    this.genreUpdated.emit(this.genre);
  }

  modeAjout(){
    this.ajout = true;
    this.genre.idGen = 0;
    this.genre.nomGen = "";
  }
}
