import { Directive, ElementRef, Input } from '@angular/core';
import { Animation, App } from 'ionic-angular';

@Directive({
  selector: '[deckOfCards]'
})
export class DeckOfCards {

  @Input() index: number;
  @Input() verticalOffset: number = DEFAULT_VERTICAL_OFFSET;

  private translateYValue: number = 0;

  constructor(private elementRef: ElementRef, private app: App) {
  }

  ngOnChanges() {
    if ( ! this.verticalOffset ) {
      this.verticalOffset = DEFAULT_VERTICAL_OFFSET;
    }

    let previousTranslateYValue = this.translateYValue;
    this.translateYValue = 0 - (this.index + 1) * this.verticalOffset;

    this.app.setEnabled(false, ANIMATION_DURATION);
    let animation = new Animation(this.elementRef.nativeElement);
    animation.fromTo('translateY', `${previousTranslateYValue}px`, `${this.translateYValue}px`);
    animation.fromTo('zIndex', '1', `${this.index}`);
    animation.duration(ANIMATION_DURATION);
    animation.onFinish( () => {
      this.app.setEnabled(true);
    });
    animation.play();
  }
}

const ANIMATION_DURATION = 100;
const DEFAULT_VERTICAL_OFFSET = 4;
