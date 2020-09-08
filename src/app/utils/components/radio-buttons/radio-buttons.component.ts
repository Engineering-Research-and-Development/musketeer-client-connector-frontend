import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface Child {
  title: string;
  value: any;
}

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {
  @Input() children: Child[];

  @Input() selected: any;
  @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

}
