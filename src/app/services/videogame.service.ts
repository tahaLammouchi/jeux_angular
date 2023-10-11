import { Injectable } from '@angular/core';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

import { Videogame } from '../model/videogame.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/genreWrapped.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
providedIn: 'root'
})
export class VideogameService {
  apiURL: string = 'http://localhost:8091/videogames/api';
  apiURLGen: string = 'http://localhost:8091/videogames/gen';
videogames! : Videogame[]; //un tableau de Videogame
videogame! : Videogame ;
genres! : Genre[];
constructor(private http : HttpClient,private authService : AuthService) {
 
}
listeVideogames():Observable<Videogame[]>{
  return this.http.get<Videogame[]>(this.apiURL+"/all");
}

ajouterVideogame( vid: Videogame):Observable<Videogame>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.post<Videogame>(this.apiURL+"/addvid", vid, {headers:httpHeaders});}

supprimerVideogame( id : number){
  //supprimer le Videogame vid du tableau Videogames
  const url = `${this.apiURL}/delvid/${id}`;
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.delete(url, {headers:httpHeaders});
  
  }

  consulterVideogame(id:number): Observable<Videogame>{
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.get<Videogame>(url,{headers:httpHeaders});
    
    }

    updateVideogame(vid:Videogame) : Observable<Videogame>
{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
  return this.http.put<Videogame>(this.apiURL+"/updatevid", vid, {headers:httpHeaders});
}

trierVideogames(){
  this.videogames = this.videogames.sort((n1,n2) => {
  if (n1.idVideogame! > n2.idVideogame!) {
  return 1;
  }
  if (n1.idVideogame! < n2.idVideogame!) {
  return -1;
  }
  return 0;
  });
  }
  listeGenres():Observable<GenreWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<GenreWrapper>(this.apiURLGen,{headers:httpHeaders}
    );
    
  }
  consulterGenre(id:number):Genre{
    return this.genres.find(gen =>gen.idGen == id) ! ;
  }

  rechercherParGenre(idGen: number):Observable< Videogame[]> {
    const url = `${this.apiURL}/vidgen/${idGen}`;
    return this.http.get<Videogame[]>(url);
    }

    rechercherParNom(nom: string):Observable< Videogame[]> {
      const url = `${this.apiURL}/vidByName/${nom}`;
      return this.http.get<Videogame[]>(url);
      }

      ajouterGenre( gen : Genre):Observable<Genre>{
        return this.http.post<Genre>(this.apiURLGen, gen, httpOptions);
    }

    supprimerGenre(id : number){
      const url = `${this.apiURLGen}/${id}`; 
      return this.http.delete(url, httpOptions);
    }

    uploadImage(file: File, filename: string): Observable<Image>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/upload'}`;
      return this.http.post<Image>(url, imageFormData);
      }
      loadImage(id: number): Observable<Image> {
      const url = `${this.apiURL + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
      }

      uploadImageVid(file: File, filename: string, idVid:number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${this.apiURL + '/image/uploadImageVid'}/${idVid}`;
        return this.http.post(url, imageFormData);
        }

        supprimerImage(id : number) {
          const url = `${this.apiURL}/image/delete/${id}`;
          return this.http.delete(url, httpOptions);
          }
}