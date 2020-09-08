import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() label: string;
  @Input() inputId: string = 'configFile';
  @Input() required = true;
  @Output() fileContent = new EventEmitter<any>();
  file: any;

  constructor(private toaster: ToastrService) { }

  ngOnInit() {
  }

  handleFileInput(evt: Event) {
    this.file = evt.target['files'].item(0);
    if (!this.file) return;
    this.readFile();
  }

  readFile() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        let content = <string>fileReader.result;
        this.fileContent.emit(JSON.parse(content));
      } catch (e) {
        this.toaster.error('Error during file parsing, file must be a valid JSON.');
        this.file = null;
      }
    }
    fileReader.readAsText(this.file);
  }

}
