import { Component, DestroyRef, inject, input, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  private intervalId?: ReturnType<typeof setInterval>;
  //private destroyRef = inject(DestroyRef);

  ngOnInit () {
    this.intervalId = setInterval(() => {
      const random = Math.random();

      if (random < 0.5) {
        this.currentStatus.set('online');
      } else if (random < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    //this.destroyRef.onDestroy(() => {
    //  clearInterval(this.intervalId);
    //});
   }

   ngOnDestroy() {
       clearTimeout(this.intervalId);
   }

  
}
