import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, 
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-1f60d.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get<Recipe[]>('https://ng-recipe-book-1f60d.firebaseio.com/recipes.json?auth='+token) //need to specify in <dataType> that we are expecting Recipe[] from out subscribe callback   
            .pipe(
                map(
                    (recipes: Recipe[]) => {
                        for (let recipe of recipes) {
                            if(!recipe['ingredients']) {
                                console.log(recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                (recipes) => {
                    //const recipes: Recipe[] = response; //we don't need to do this anymore since we expect an array of Recipes
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}