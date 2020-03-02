import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs'; //to transform Promise to Observable
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect() //can be false if Action does not change application store but just triggers a state change
    authSignup = this.actions$.pipe( //listen to the action
        ofType(AuthActions.TRY_SIGNUP), //we want to react to the TRY_SIGNUP action
        map((action: AuthActions.TrySignup) => { //we only need the payload of this action, so we call map -- which will be wrapped in a new Observable
            return action.payload;
        }),
        switchMap((authData: { username: string, password: string}) => { //reach out to firebase and create a user
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken()); //reach out to firebase and get a token
        }),
        mergeMap((token: string) => { //return an array, which will be returned merged as Observables, NgRx will handle these due to the @Effects decorator on authSignup
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        }) //return two Observables/Effects into 1 Observable, this works if all prior function succeed
    ); //information about all the actions we have in our applications, watch for certain actions occurying

    @Effect()
    authSignin = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNIN),
        map((action: AuthActions.TrySignin) => { //we only need the payload of this action, so we call map -- which will be wrapped in a new Observable
            return action.payload;
        }),
        switchMap((authData: { username: string, password: string}) => { //reach out to firebase and create a user
            return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken()); //reach out to firebase and get a token
        }),
        mergeMap((token: string) => { //return an array, which will be returned merged as Observables, NgRx will handle these due to the @Effects decorator on authSignup
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        })
    ); 

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private router: Router) { //$ marks it as Observable, Actions is like a list of all our actions

    }
}