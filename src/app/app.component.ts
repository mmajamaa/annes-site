import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anne';
  public url = 'http://localhost:4201';
  public textContent = {};
  public language = 'fi';
  public show = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.url).subscribe(res => {
      console.log(res)
      this.textContent = res;
      this.show = res['fi'];
    });
  }

  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  toggleLanguage() {
    this.language = this.language == 'fi' ? 'en' : 'fi';
    this.show = this.textContent[this.language];
    Array.from(document.getElementsByClassName("flag")).forEach((f) => {
      if (!f.className.split(' ')[1]) {
        f.className += ' hide';
      } else {
        f.className = 'flag';
      }
      console.log(f.className)
    })

  }
}
