import { PanGestureController } from './utils/gestures/pan-gesture';
import { HammerFactory } from './utils/gestures/hammer-factory';

import { PoochProvider } from './pages/dog-data-provider';

export const PROVIDERS = [PanGestureController, HammerFactory, PoochProvider];
