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
    <tinder-card class="stacked" *ngFor="let dog of displayedDogs; let i=index"
      deckOfCards="i"
      [index]="i"
      [maxOffsetIndex]="2"
      [enabled]="i === displayedDogs?.length - 1"
      [yStackOffset]="0 - (i + 1) * 4"
      [parentWidth]="contentWidth"
      (cardSwipeLeftToRight)="tossed(i)"
      (cardSwipeRightToLeft)="tossed(i)"
      >
      <div class="card-image" [ngStyle]="{ 'background-image': getBackgroundUrl(dog.url) }"></div>
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

  private displayedDogs: DogDetails[];
  private allDogs: DogDetails[];

  constructor(private navCtrl: NavController, private poochProvider: PoochProvider) {
  }

  ionViewWillEnter() {
    let localAllDogs = this.poochProvider.getDogs();
    let localDisplayedDogs = localAllDogs.splice(0, NUM_DOGS_DISPLAYED);
    this.allDogs = localAllDogs;
    this.displayedDogs = localDisplayedDogs;
  }

  ionViewDidEnter() {
    this.contentWidth = this.content.nativeElement.clientWidth;
  }

  tossed(index) {
    let localAllDogs = this.allDogs.concat()
    localAllDogs.splice(index, 1);
    let localDisplayedDogs = this.displayedDogs.concat();
    localDisplayedDogs.splice(localDisplayedDogs.length - 1, 1);
    if ( localAllDogs.length > 0 ) {
      let firstElement = localAllDogs.splice(0, 1);
      localDisplayedDogs.unshift(firstElement[0]);
    }
    this.allDogs = localAllDogs;
    this.displayedDogs = localDisplayedDogs;
  }



  getBackgroundUrl(url) {
    return `url('${url}')`;
  }
}

const NUM_DOGS_DISPLAYED = 3;
