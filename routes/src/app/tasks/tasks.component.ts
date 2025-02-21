import { Component, computed, DestroyRef, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { UsersService } from '../users/users.service';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>();
  private tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'asc') {
          return a.id > b.id ? 1 : -1;
        } else {
          return a.id < b.id ? 1 : -1;
        }
      })
  );
  //private activatedRoute = inject(ActivatedRoute);
  //private destroyRef = inject(DestroyRef);
  //
  //ngOnInit() {
  //  const subs = this.activatedRoute.paramMap.subscribe({
  //    next: params => {
  //      this.order = params['order']
  //    }
  //  });
  //
  //  this.destroyRef.onDestroy(() => subs.unsubscribe());
  //}
}
