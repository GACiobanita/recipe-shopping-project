import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule, //we need the dropdown directive, we use it in our header component
        AppRoutingModule //we register here our application routes
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent 
    ],
    providers: [
        ShoppingListService, 
        RecipeService, 
        DataStorageService, 
        AuthService
    ]
})
export class CoreModule {

}