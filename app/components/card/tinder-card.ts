import { Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import { Animation, App, DisableScroll, ViewController } from 'ionic-angular';

import { PanGesture, PanGestureController } from '../../utils/gestures/pan-gesture';

@Component({
  selector: `tinder-card`,
  template: `
    <ng-content></ng-content>
  `
})
export class TinderCard {

  @Output() cardReset: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardSwipeLeftToRight: EventEmitter<any> = new EventEmitter<any>();
  @Output() cardSwipeRightToLeft: EventEmitter<any> = new EventEmitter<any>();

  @Input() enabled: boolean;
  @Input() yStackOffset: number;
  @Input() parentWidth: number;

  private rectangle: any;
  private panGesture: PanGesture;

  private currentRotationAngle: number;
  private currentX: number;

  constructor(public elementRef: ElementRef, private app: App, private panGestureController: PanGestureController, private viewController: ViewController) {
    //viewController.didEnter.subscribe( () => { this.didEnter(); } );
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.rectangle = this.elementRef.nativeElement.getBoundingClientRect();
      this.panGesture = this.panGestureController.create(this.elementRef, { threshold: 1, disableScroll: DisableScroll.Always});
      this.panGesture.onPanMove( (event) => { this.onPanMove(event) } );
      this.panGesture.onPanEnd( (event) => { this.onPanEnd(event) } );
    }, 250);
  }

  onPanMove(event: HammerInput) {

    if ( ! this.enabled ) {
      return;
    }
    let previousRotationAngle = this.currentRotationAngle || 0;
    let previousX = this.currentX || 0;
    let o = event.deltaX / -1000;
    this.currentRotationAngle = Math.atan(o);
    this.currentX = event.deltaX;
    this.animateDrag(this.elementRef, previousX, this.currentX, this.yStackOffset, this.yStackOffset, previousRotationAngle, this.currentRotationAngle);
  }

  onPanEnd(event: HammerInput) {
    if ( ! this.enabled ) {
      return;
    }

    if ( this.shouldReset(Math.abs(event.deltaX)) ) {
      this.animateReset(this.elementRef, event.deltaX, this.yStackOffset, this.yStackOffset, this.currentRotationAngle);
    } else {
      let previousRotationAngle = this.currentRotationAngle || 0;
      let previousX = this.currentX || 0;
      let o = event.deltaX / -1000;
      this.currentRotationAngle = Math.atan(o);

      // add small buffer (one extra width of card) to distance transformed to account for rotation
      if ( event.deltaX > 0 ) {
        this.currentX = this.parentWidth + this.rectangle.width;
      } else {
        this.currentX = 0 - this.rectangle.left - (this.rectangle.width * 2);
      }


      let distance = Math.abs(this.currentX - previousX);
      let velocity = Math.max(Math.abs(event.velocityX), MINIMUM_VELOCITY);
      let duration = distance / velocity;

      this.app.setEnabled(false, duration);
      this.animateDrag(this.elementRef, previousX, this.currentX, this.yStackOffset, this.yStackOffset, previousRotationAngle, this.currentRotationAngle, duration, 'ease-in-out', () => {
        this.app.setEnabled(true);
        if ( event.deltaX > 0 ) {
          this.cardSwipeLeftToRight.emit(null);
        } else{
          this.cardSwipeRightToLeft.emit(null);
        }
      });
    }
  }

  shouldReset(distanceTraveled: number) {
    if ( !! this.parentWidth ) {
      let threshold = this.parentWidth / 4;
      return distanceTraveled < threshold;
    }
    return distanceTraveled < DEFAULT_DISTANCE_THRESHOLD_IN_PIXELS;
  }

  animateDrag(elementRef: ElementRef, previousX: number, currentX: number, previousY: number, currentY: number, previousAngleInRadians: number,  currentAngleInRadians: number, duration: number = 0, easing: string = null, callback: Function = null) {
    let animation = new Animation(elementRef);
    animation.fromTo('translateX', `${previousX}px`, `${currentX}px`);
    animation.fromTo('translateY', `${previousY}px`, `${currentY}px`);
    animation.fromTo('rotate', `${previousAngleInRadians}rad`, `${currentAngleInRadians}rad`);
    animation.duration(duration);
    if ( easing ) {
      animation.easing(easing);
    }
    if ( callback ) {
      animation.onFinish(callback);
    }
    animation.play();
  }

  animateReset(elementRef: ElementRef, previousX: number, previousY: number, currentY: number, previousAngleInRadians: number) {
    this.app.setEnabled(false, RESET_DURATION_IN_MILLIS);
    let animation = new Animation(elementRef);
    animation.fromTo('translateX', `${previousX}px`, `${0}px`);
    animation.fromTo('translateY', `${previousY}px`, `${currentY}px`);
    animation.fromTo('rotate', `${previousAngleInRadians}rad`, `${0}rad`);
    animation.duration(RESET_DURATION_IN_MILLIS);
    animation.onFinish( () => {
      this.app.setEnabled(true);
      this.cardReset.emit(null);
    });
    animation.play();
  }
}

const MINIMUM_VELOCITY = 2.5;
const RESET_DURATION_IN_MILLIS = 200;
const DEFAULT_DISTANCE_THRESHOLD_IN_PIXELS = 300;
