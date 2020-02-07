import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService] //the RecipeService will only be used by the Components in the Recipe Feature
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
