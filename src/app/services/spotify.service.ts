import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBUyyEmVxePwWP0quiQq4dmI5VErqltdg8eGg1QvYwIy56xT6bb2g3_KRMbPVKiRdqHzBF0no03S2wWm1jcuXla98kalfhTUPJqFxC55Pwn3D0lZMqA1t2IFDsb-aWgQdYoGNN73qTsQoKr'
    });
    return this.http.get(url, {headers})
  }


  getNewReleases() {  

    return this.getQuery('browse/new-releases?limit=48')
            .pipe( map( data => data['albums'].items ));

  }


  getArtists(term: string) {
   
    return this.getQuery(`search?q=${term}&type=artist&limit=15`)
            .pipe( map( data=> data['artists'].items ));
  }


  getArtist(id: string) {
   
    return this.getQuery(`artists/${id}`);         
  }

  getTopTracks(id: string) {
    
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
            .pipe( map( data=> data['tracks']));

  }
  
}
