import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeckOfCards } from '../components/card/deck-of-cards';
import { TinderCard } from '../components/card/tinder-card';

import { DogDetails, PoochProvider } from './dog-data-provider';

@Component({
  directives: [DeckOfCards, TinderCard],
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        Dinder
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content #content>
    <tinder-card class="stacked" *ngFor="let dog of dogs; let i=index"
      deckOfCards="i"
      [index]="i"
      [enabled]="true"
      [yStackOffset]="0 - (i + 1) * 4"
      [parentWidth]="contentWidth">
      <div [ngStyle]="{ 'background-image': getBackgroundUrl(dog.url),
        'height': '250px',
        'background-position': 'center center',
        'background-size': 'cover'}">
      </div>
      <div padding>
        <h1 class="name">{{dog.name}},
          <span class="age" *ngIf="dog.age > 1">{{dog.age}} years old</span>
          <span class="age" *ngIf="dog.age <= 1">{{dog.age}} year old</span>
          <ion-icon name="checkmark-circle" class="verified"></ion-icon>
        </h1>
        <h4 class="breed">{{dog.breed}}</h4>
      </div>
    </tinder-card>
  </ion-content>
  `
})
export class HomePage {

  @ViewChild('content', { read: ElementRef }) content: ElementRef;
  private contentWidth: number;
  private dogs: DogDetails[];

  constructor(private navCtrl: NavController, private poochProvider: PoochProvider) {
  }

  ionViewWillEnter() {
    this.dogs = this.poochProvider.getDogs();
  }

  ionViewDidEnter() {
    this.contentWidth = this.content.nativeElement.clientWidth;
  }

  getBackgroundUrl(url) {
    return `url('${url}')`;
  }
}
