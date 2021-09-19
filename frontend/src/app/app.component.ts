import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private _http: HttpClient) {

  }

  ngOnInit() {
    this._http.post('http://localhost:8082/api/gtw/auth/login', {
      "email": "n@codesignlabs.com",
      "password": "Neha@2307#"
    }).subscribe((data: any) => {
      console.log(data);
    });
  }
}
