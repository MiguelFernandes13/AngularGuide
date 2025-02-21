import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong while fetching the available places!'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong while fetching your favorite places!'
    ).pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        },
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const userPlaces = this.userPlaces();
    if (!userPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...userPlaces, place]);
    }
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(userPlaces);
          this.errorService.showError('Something went wrong while adding the place to your favorite places!');
          return throwError(
            () =>
              new Error(
                'Something went wrong while adding the place to your favorite places!'
              )
          )
        }
        )
      );
  }

  removeUserPlace(place: Place) {
    const prevUserPlaces = this.userPlaces();

    if(prevUserPlaces.some((p) => p.id === place.id))
      this.userPlaces.set(prevUserPlaces.filter((p) => p.id !== place.id));

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`).pipe(
      catchError((error) => {
        this.userPlaces.set(prevUserPlaces);
        this.errorService.showError('Something went wrong while removing the place from your favorite places!');
        return throwError(() => new Error('Something went wrong while removing the place from your favorite places!'))
      })
    )
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => throwError(() => new Error(errorMessage)))
    );
  }
}
