import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipes from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipes.State>;
  id: number;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        }
      );
  }

  onAddToShoppingList() {
    this.store.select('recipes').pipe(take(1))
      .subscribe((recipeState: fromRecipes.State) => {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients));
      }); 
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route}); //id is not necessary in this case
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); //we go up one level -../- then we add our id again, and then edit
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
  
  //remember to clear up subscriptions if using personal observables, these ones are Angular managed
}
