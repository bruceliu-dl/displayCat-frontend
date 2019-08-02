import { Component, OnInit } from '@angular/core';
import { AppComponentService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  male: any;
  female: any;


  constructor(private _appService: AppComponentService){}
  ngOnInit(){
    this._appService.getOnlineJsonData().subscribe(d => {
      this.male = d['male'].sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()){
          return 1;
        } else {
          return 0;
        }
      });

      this.female = d['female'].sort((a, b) => {
        if (a.name.toUpperCase() < b.name.toUpperCase()) {
          return -1;
        } else if (a.name.toUpperCase() > b.name.toUpperCase()){
          return 1;
        } else {
          return 0;
        }
      });
    });
  }
}
