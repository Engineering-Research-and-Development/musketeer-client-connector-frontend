import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommsConfiguration } from '../../services/configuration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comms-config-form',
  templateUrl: './comms-config-form.component.html',
  styleUrls: ['./comms-config-form.component.scss']
})
export class CommsConfigFormComponent implements OnInit {
  @Input() commsConfig: CommsConfiguration = new CommsConfiguration();
  @Output() submitted = new EventEmitter<CommsConfiguration>();
  file: any;
  credentials: boolean;

  constructor() { }

  ngOnInit() {
  }

  submitCommsConfig(evt: Event) {
    evt.stopPropagation();
    this.submitted.emit(this.commsConfig);
  }

}
