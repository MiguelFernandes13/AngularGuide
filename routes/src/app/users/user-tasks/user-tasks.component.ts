import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();
  //private userService = inject(UsersService);
  //alternate way to get userName from userId
  //userName = computed(() => this.userService.users.find(user => user.id === this.userId())?.name);
  //get from resolveUserName defined below
  userName = input.required<string>();
  message = input.required<string>();
  //private activatedRoute = inject(ActivatedRoute);

  //alternate way to get userId from route
  //ngOnInit() {
  //  this.activatedRoute.paramMap.subscribe({
  //    next: params => {
  //      this.userName = this.userService.users.find(user => user.id === params.get('userId'))?.name || '';
  //    }
  //  })
  //}
}

export const resolverUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (user) => user.id === activatedRoute.params['userId']
    )?.name || '';
  return userName;
};

export const resolverTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolverUserName(activatedRoute, routerState) + '\'s Tasks';
};
