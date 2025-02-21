import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolverTitle, resolverUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import{ routes as userRoutes } from './users/users.routes';
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const souldGetAccess = Math.random();
    if (souldGetAccess > 0.5)
        return true;

    const router = inject(Router);

    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        data: {
            message: 'Hello!'
        },
        resolve: {
            userName: resolverUserName
        },
        title: resolverTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];