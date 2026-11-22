import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';
import { Movie } from '../interfaces/movie';

@Injectable({
    providedIn: 'root',
})
export class MovieService {
    private readonly http=inject(HttpClient);
    private readonly url = environment.urlapi;
    private readonly key = environment.apiKey;
    private readonly movieUrl = environment.url_movie_api;

    public movieList=signal<Movie[]>([]);
    public selectedMovie = signal<Movie | null>(null);
    public wishList = signal<Movie[]>([]);

    getMovieList():Observable<Movie[]>{
        return this.http.get<MovieResponse>(`${this.url}?api_key=${this.key}`).pipe(
            map(response => response.results)
        );
    }
    getMovieById(id:number){
        return this.http.get<Movie>(`${this.movieUrl}/${id}?api_key=${this.key}`).pipe(
            map(response => response)
        );
    }
    addToWishList(movie: Movie) {
        this.wishList.update(wishlist => [...wishlist, movie])
        localStorage.setItem('wishlist', JSON.stringify(this.wishList()))
    }
}
