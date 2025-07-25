import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class HomePage {
  //Variables, datos
  mensaje = 'Hola desde el home.page.ts'
  constructor() {}
  //Funciones
  Saludar(){
    console.log(this.mensaje);
  }
}
