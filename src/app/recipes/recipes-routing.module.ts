import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent, children:[
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
      ] },
]

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes) //not on the "root" module -- we are in a child module -- we use .forChild()
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard //since it is only used by the Recipe Service
    ]
})
export class RecipesRoutingModule{}