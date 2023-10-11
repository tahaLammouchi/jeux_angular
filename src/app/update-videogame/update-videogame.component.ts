import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { VideogameService } from '../services/videogame.service';
import { Videogame } from '../model/videogame.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-update-videogame',
  templateUrl: './update-videogame.component.html',
  styleUrls: []
})
export class UpdateVideogameComponent implements OnInit {
  currentVideogame = new Videogame();
  genres ! : Genre[];
  updatedGenId! : number ;
  myImage! : string;
  uploadedImage!: File;
  apiURL: string = 'http://localhost:8091/videogames/api';

isImageUpdated: Boolean=false;
  constructor(private http : HttpClient ,private activatedRoute: ActivatedRoute,private router : Router,private videogameService : VideogameService) 
  { }

  ngOnInit(): void {
   this.videogameService.listeGenres().subscribe(gen =>{console.log(gen); this.genres = gen._embedded.genres ; });
   this.videogameService.consulterVideogame(this.activatedRoute.snapshot.params['id']).subscribe(vid =>{
    this.http.get<Image[]>(this.apiURL + "/imagesByVid/" + vid.idVideogame).subscribe(
      images => {
      vid.images = images;
    this.currentVideogame = vid; 
    this.updatedGenId = this.currentVideogame.genre.idGen;
    
  });
  });
   //console.log(this.currentVideogame);
  /* this.videogameService
.loadImage(this.currentVideogame.image.idImage)
.subscribe((img: Image) => {
this.myImage = 'data:' + img.type + ';base64,' + img.image;
}); 
*/
  }

  updateVideogame()
{ //console.log(this.currentProduit);
  this.currentVideogame.genre = this.genres.find(gen => gen.idGen == this.updatedGenId)!;
this.videogameService
.updateVideogame(this.currentVideogame)
.subscribe((vid) => {
this.router.navigate(['videogames']);
});

}



onImageUpload(event: any) {
  if(event.target.files && event.target.files.length) {
  this.uploadedImage = event.target.files[0];
  this.isImageUpdated =true;
  const reader = new FileReader();
  reader.readAsDataURL(this.uploadedImage);
  reader.onload = () => { this.myImage = reader.result as string; };
  }
  }

  onAddImageVideogame() {
    this.videogameService.uploadImageVid(this.uploadedImage, 
    this.uploadedImage.name,this.currentVideogame.idVideogame!)
    .subscribe( (img : Image) => {
    this.currentVideogame.images.push(img);
    });
    }

    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.videogameService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images 
      const index = this.currentVideogame.images.indexOf(img, 0);
      if (index > -1) {
      this.currentVideogame.images.splice(index, 1);
      }
      });
      }
      
}
