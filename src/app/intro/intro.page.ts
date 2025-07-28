import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IntroPage implements OnInit {

navigation = '/home';

genres = [
  {
    tittle:"CRO",
    image:"https://i.scdn.co/image/ab67616d0000b273ec29b2193ea3f0bed4dacf08",
  },
  {
    tittle:"Rock Argentino",
    image:"https://i.scdn.co/image/ab67616d0000b273ea9567ecfc48dd6cb30b4563",
  },
  {
    tittle:"Pop",
    image:"https://www.billboard.com/wp-content/uploads/2022/05/bad-bunny-cover-art-2022-billboard-1548.jpg?w=942&h=623&crop=1&resize=942%2C623"
  },
  {
    tittle:"Rels B",
    image:"https://cdn-images.dzcdn.net/images/cover/246d2d6a198c2369a3be5c1f19f859ec/500x500-000000-80-0-0.jpg",
  },
  {
    tittle:"3 AM",
    image:"https://akamai.sscdn.co/letras/360x360/albuns/5/a/3/9/2041061701342165.jpg",
  },
  {
    tittle:"Eladio Carreon",
    image:"https://i.scdn.co/image/ab67616d0000b273ff62e603fe8ea1813b4ff5a8",
  },
  {
    tittle:"Milo J",
    image:"https://akamai.sscdn.co/letras/360x360/albuns/9/a/b/0/1783691707134363.jpg",
  }
  ]

constructor(private storageService: StorageService, private router: Router, private navCtrl: NavController) {}

  ngOnInit() {
  }

  goBack(){
    console.log("Volver");
    this.router.navigateByUrl("/home")

    this.storageService.set("home",true)

  }


async continuar() {
  await this.storageService.set('introSeen', true);
  this.navCtrl.navigateRoot('/menu/home');
}


}
