import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MMLLConfiguration } from '../../services/configuration.service';

@Component({
  selector: 'app-mmll-config-form',
  templateUrl: './mmll-config-form.component.html',
  styleUrls: ['./mmll-config-form.component.scss']
})
export class MmllConfigFormComponent implements OnInit {
  @Input() mmllConfig: MMLLConfiguration = new MMLLConfiguration();
  @Output() submitted = new EventEmitter<MMLLConfiguration>();
  credentials: boolean;

  constructor() { }

  ngOnInit() {
  }

  submitMMLLConfig(evt: Event) {
    evt.stopPropagation();
    this.submitted.emit(this.mmllConfig);
  }

}
