import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  token: string = '';

  constructor(private _http: HttpClient) {

  }

  ngOnInit() {
    this._http.post(environment.api_url + '/api/gtw/auth/login', {
      "email": "n@codesignlabs.com",
      "password": "Neha@2307#"
    }).subscribe((data: any) => {
      console.log(data);
      this.token = data.token;
    });
  }
}
