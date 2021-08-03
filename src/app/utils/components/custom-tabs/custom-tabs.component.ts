import { AfterContentChecked, AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { CustomTabComponent } from '../custom-tab/custom-tab.component';

@Component({
  selector: 'app-custom-tabs',
  templateUrl: './custom-tabs.component.html',
  styleUrls: ['./custom-tabs.component.scss']
})
export class CustomTabsComponent implements AfterContentInit, AfterContentChecked {

  @ContentChildren(CustomTabComponent) tabs: QueryList<CustomTabComponent>;

  tabItems$: Observable<CustomTabComponent[]>;

  activeTab: CustomTabComponent;

  @Output() tabChange = new EventEmitter<number>();

  constructor() { }

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(startWith(""))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));
  }

  ngAfterContentChecked() {
    //choose the default tab
    // we need to wait for a next VM turn,
    // because Tab item content, will not be initialized yet
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: CustomTabComponent, n: number) {
    if (this.activeTab === tabItem) return;

    if (this.activeTab) this.activeTab.isActive = false;

    this.activeTab = tabItem;
    tabItem.isActive = true;
    
    this.tabChange.emit(n);
  }


}
