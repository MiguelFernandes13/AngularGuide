import { computeMsgId } from '@angular/compiler';
import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  //convert a signal in observable
  clickCount$ = toObservable(this.clickCount);
  //A comentado esta uma maneira diferente de se fazer a mesma coisa mas com signals 
  //interval = signal(0);
  //doubleInterval = computed(() => this.interval() * 2);
  customInterval$ = new Observable((subscriber) => {
    let count = 0;
    const intervalId = setInterval(() => {
      if (count > 5){
        clearInterval(intervalId);
        subscriber.complete();
      }
      subscriber.next(count++);
    }, 1000);
  })

  constructor() {
    //effect(() => {
    //  console.log('Clicked button: ', this.clickCount());
    //});
  }

  ngOnInit() {
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed')
    });

    const subscription = interval(1000).pipe(
      map((value) => value * 2)
    ).subscribe((val) => {
      next: console.log(val);
    });

    //setInterval(() => {
    //  this.interval.update((val) => val + 1);
    //}, 1000);

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onClick(){
    this.clickCount.update((val) => val + 1);
  }

}
