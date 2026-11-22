import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';

@Component({
  imports: [],
  selector: 'app-wishlist',
  styleUrl: './wishlist.css',
  templateUrl: './wishlist.html',
})
export class Wishlist {
  router = inject(Router);
  movieService = inject(MovieService);

  backToMovieList() {
    this.router.navigate(['/']);
  }

  navigateTo(movie: Movie) {
    this.router.navigate(['/', movie.id]);
  }

  removeFromWishList(id: number) {
    this.movieService.wishList.update(list => list.filter(m => m.id !== id));
  }
}