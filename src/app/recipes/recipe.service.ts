import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    //moved placeholder recipes
    private recipes: Recipe[] = [
        new Recipe(
            'Burger', 
            'Burger Description', 
            'https://upload.wikimedia.org/wikipedia/commons/0/0b/RedDot_Burger.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Bun', 1),
                new Ingredient('Cheese', 1),
                new Ingredient('Sauce', 1)
            ]),
        new Recipe(
            'Salad', 
            'Salad Description', 
            'https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg',
            [
                new Ingredient('Tomato', 2)
            ]),
        new Recipe(
            'Pizza', 
            'Pizza Description', 
            'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Pizza Base', 1)
            ])
      ];

    constructor() {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice()); //update the list
    }

    getRecipes() {
        return this.recipes.slice(); //slice returns a new array that is exactly like this one. The original cannot be accessed
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index]; //copy of the object
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}