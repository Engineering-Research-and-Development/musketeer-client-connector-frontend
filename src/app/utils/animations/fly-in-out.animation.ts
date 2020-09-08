import { trigger, transition, style, animate, query } from '@angular/animations';

export const flyInOutAnimation = trigger('flyInOutAnimation', [
    transition(':enter',
        [style({ opacity: 0, transform: 'translateX(2000px)' }), animate('250ms 250ms', style({ opacity: 1, transform: 'translateX(0)' }))]
    ),
    transition(':leave',
        [style({ opacity: 1, transform: 'translateX(0)' }), animate('250ms', style({ opacity: 0, transform: 'translateX(-2000px)' }))]
    )
]);