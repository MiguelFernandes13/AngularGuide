import { createReducer, on } from "@ngrx/store";
import { decrement, increment, set } from "./counter.action";

const innitialState = 0;

export const counterReducer =  createReducer(
    innitialState,
    on(increment, (state, action) => state + action.value),
    on(decrement, (state, action) => state - action.value),
    on(set, (state, action) => action.value),
);


// what happends under the hood when using createReducer
//export function counterReducer(state = innitialState, action: CounterActions | Action) {
//    switch (action.type) {
//        case '[Counter] Increment':
//            return state + (action as IncrementAction).value;
//        default:
//            return state;
//}