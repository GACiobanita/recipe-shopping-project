import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

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
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, // in order to provide our AuthInterceptor 
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true} // in order to provide our LoggingInterceptor
        //interceptor order is important, from top to bottom
    ]
})
export class CoreModule {

}