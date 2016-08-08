import { Directive, ElementRef, Input } from '@angular/core';
import { Animation } from 'ionic-angular';

@Directive({
  selector: '[deckOfCards]'
})
export class DeckOfCards {

  @Input() index: number;
  @Input() verticalOffset: number = DEFAULT_VERTICAL_OFFSET;

  constructor( private elementRef: ElementRef ) {
  }

  ngOnChanges() {
    if ( ! this.verticalOffset ) {
      this.verticalOffset = DEFAULT_VERTICAL_OFFSET;
    }

    let animation = new Animation(this.elementRef.nativeElement);
    animation.fromTo('translateY', '0px', `${0 - (this.index + 1) * this.verticalOffset}px`);
    animation.fromTo('zIndex', '1', `${this.index}`);
    animation.play();
  }
}

const DEFAULT_VERTICAL_OFFSET = 4;
