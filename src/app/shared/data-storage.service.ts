import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, 
                private recipeService: RecipeService) {}

    storeRecipes() {
        // const token = this.authService.getToken();
        // return this.http.put('https://ng-recipe-book-1f60d.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //     observe:'body',
        //     params: new HttpParams().set('auth', token) //shorter url without the ?auth= part
        // });
        //instead send a request without the token, in this case 'auth', so that it is caught by the interceptor
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-1f60d.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), {reportProgress: true});
        return this.http.request(req);
    }

    getRecipes() {
        this.http.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
        }) //need to specify in <dataType> that we are expecting Recipe[] from out subscribe callback   
            .pipe(
                map(
                    (recipes)=> {
                        for (let recipe of recipes) {
                            if(!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                    }
                )
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    //const recipes: Recipe[] = response; //we don't need to do this anymore since we expect an array of Recipes
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}