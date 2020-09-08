import { Component, Input, OnChanges } from '@angular/core';

class Star {
  fill: boolean;
  color: string;

  constructor(fill: boolean, color: string) {
    this.fill = fill;
    this.color = `text-${color}`;
  }
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnChanges {
  @Input() mode: string = 'stars';
  @Input() max: number = 5;
  @Input() value: number;

  stars: Star[];

  constructor() { }

  ngOnChanges() {
    this.initStars();
  }

  initStars() {
    this.stars = [];

    for(let i = 1; i <= this.max; i++) {
      let color = this.value <= 2 ? 'danger' : this.value <= 4 ? 'warning' : 'success';
      let fill = i <= this.value;

      this.stars.push(new Star(fill, color));
    }
  }

}
