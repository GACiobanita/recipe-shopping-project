import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCnFM70DdSdSGl2RKGizO6IwACuRtc9iBg",
      authDomain: "ng-recipe-book-1f60d.firebaseapp.com",
    });//expect a javascript object as an argument
  }

  onNavigate(feature : string) {
    this.loadedFeature = feature;
  }
}