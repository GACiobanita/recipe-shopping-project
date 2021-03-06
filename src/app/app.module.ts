import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from'../environments/environment';

import { AppComponent } from './app.components';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';


// VVVVVV Decorator
@NgModule({
  declarations: [
    AppComponent
  ], //register new components
  imports: [
    BrowserModule.withServerTransition({appId: 'my-universal-app'}), //a module that contains all the features of the CommonModule  + features needed at the time the app starts
    HttpClientModule,
    AppRoutingModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(reducers), // in the main application -- forRoot -- this adds a store, registers shoppingList as the one thing that can change the store and sets an initial state of the application
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [] //always after StoreModule, only add this module if we are not building for production
  ], //allows us to add other modules
  //RecipeService remains outside of the RecipesModule because we need to provide it in the whole application -- if it was moved it would still work
  bootstrap: [AppComponent] //tells Angular which component needs to be aware when the app starts
})
export class AppModule { }
