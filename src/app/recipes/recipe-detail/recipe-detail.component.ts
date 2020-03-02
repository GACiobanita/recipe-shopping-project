import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients)); //added functionality to push ingredients of selected recipe to the shopping list
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route}); //id is not necessary in this case
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); //we go up one level -../- then we add our id again, and then edit
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  
  //remember to clear up subscriptions if using personal observables, these ones are Angular managed
}
