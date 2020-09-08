import { trigger, transition, style, animate, query } from '@angular/animations';

export const loginSwapAnimation = trigger('loginSwapAnimation', [
    transition(':enter',
        [style({ opacity: 0, 'max-height': 0 }), animate('300ms 200ms', style({ opacity: 1, 'max-height': 300 }))]
    ),
    // transition(':leave',
    //     [style({ opacity: 1, 'max-height': 300 }), animate('300ms 100ms', style({ opacity: 0, 'max-height': 0 }))]
    // )
]);