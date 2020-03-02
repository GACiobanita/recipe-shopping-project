import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }//store needs to be the same as the global model

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList'); //this.store.select('') returns an observable
  } //get initial ingredients and subscribe to the event in the ShoppingListService to keep the list updated

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
