import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LogService } from '../log.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([]);
  private logService = inject(LogService);
  
  getTasks() {
    return this.tasks.asReadonly()();
  }

  addTask(taskData: { title: string, description: string }) {
    this.tasks.update((oldTasks) => [...oldTasks, {
      id: Math.random().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN'
    }]);

    this.logService.log(`Task "${taskData.title}" added`);
  }

  updateTasKStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
  }

}
