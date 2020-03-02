import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState { //still has the recipe states but gets all the properties of the AppState
    recipes: State
}

export interface State {
    recipes: Recipe[];
};

const initialState: State = {
    recipes: [
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
      ]
};


export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload] //payload will be an array of recipes 
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload] //spread out the old array then add the new recipe from the action payload
            };
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            }; //change the old recipe in an immutable way
            const recipes = [...state.recipes]; //get all the existing recipes
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes //recipes without the removed recipe
            };
        default:
            return state;
    }
}