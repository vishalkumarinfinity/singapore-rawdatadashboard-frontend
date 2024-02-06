import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
     
    private _auth: AuthService, 
    private _router:Router
  ) { }

  logout(){
    //this._auth.clearStorage()
    this._router.navigate(["login"]);
  }
}
