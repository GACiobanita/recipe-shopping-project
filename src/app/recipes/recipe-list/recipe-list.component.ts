import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRecipes from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipes.State>;

  constructor( private router: Router,
                private route: ActivatedRoute,
                private store: Store<fromRecipes.FeatureState>) { 

    }

  ngOnInit() {
    this.recipeState = this.store.select('recipes'); //to select the StoreModule of the Recipes
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
