import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = { //clean and central place to manage state and connected reducer mapping
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}; //without () 