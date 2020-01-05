import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable() //injecting the ShoppingListService into this service
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice(); //slice returns a new array that is exactly like this one. The original cannot be accessed
    }

    //pass the ingredients
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}