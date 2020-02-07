import { Ingredient } from "../shared/ingredient.model"
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10),
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        //for (let ingredient of ingredients) {
        //    this.addIngredient(ingredient); //emits alot of events however
        //}
        this.ingredients.push(...ingredients); //spread operator '...' turns an array of elements into a list of elements, else the push method would push the entire array as a single element of the other array
        this.ingredientsChanged.next(this.ingredients.slice());//a single emit
    }
}