import { trigger, transition, style, animate, query } from '@angular/animations';

export const emergeAnimation = trigger('emergeAnimation', [
    transition(':enter',
        [style({ opacity: 0, transform: 'scale(0.7)' }), animate('250ms 250ms', style({ opacity: 1, transform: 'scale(1)' }))]
    ),
    transition(':leave',
        [style({ opacity: 1, transform: 'scale(1)' }), animate('250ms', style({ opacity: 0, transform: 'scale(0.7)' }))]
    )
]);