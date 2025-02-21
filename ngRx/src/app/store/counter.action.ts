import { Action, createAction, props } from "@ngrx/store";

export const increment = createAction(
    '[Counter] Increment',
    props<{ value: number }>()
);

//o que acontece quando utilizado o createAction(alternativa ao código acima)
//export class IncrementAction implements Action {
//    readonly type = '[Counter] Increment';
//    constructor(public value: number) { }
//}
//
//export type CounterActions = IncrementAction;

export const decrement = createAction(
    '[Counter] Decrement',
    props<{ value: number }>()
);

export const init = createAction(
    '[Counter] Init'
);

export const set = createAction(
    '[Counter] Set',
    props<{ value: number }>()
);