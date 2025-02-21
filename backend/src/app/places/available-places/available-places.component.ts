import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private placeService = inject(PlacesService);
  private destroyRef= inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placeService.loadAvailablePlaces()
    .subscribe({
      next: (places) => {
        this.places.set(places);
      },
      complete: () => {
        this.isFetching.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectedPlace(selectedPlace: Place) {
    const subscription = this.placeService.addPlaceToUserPlaces(selectedPlace)
      .subscribe({
        next: (resData) => console.log(resData)
      }
    );

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
