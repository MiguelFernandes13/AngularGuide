import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  tasksService = inject(TaskService);
  private selectedFilter = signal<string>('all'); 
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
    switch (this.selectedFilter()) {  
      case 'open':
        return this.tasksService.getTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.getTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.getTasks().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.getTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
