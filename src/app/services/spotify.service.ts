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
      'Authorization': 'Bearer BQAJQqfoz9h7eLz3Q4UMvJYCz7QDCSSqKIJRG3_IT6bqAK3XBuQgdgE79Z1-3OlztHrdHx32YMwUSw0g2hxQY0bQ-4h1UbFJGCviTI4r87E9m7fujqvXn1xDb9z9n1bGq-jzF3Hoo7jm7u2G'
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
