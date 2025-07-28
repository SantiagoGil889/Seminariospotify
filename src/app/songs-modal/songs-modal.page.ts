import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavParams, IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { compassSharp } from 'ionicons/icons';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongsModalPage implements OnInit {
  songs: any;
  albumName: string = 'Album'; 
  albumImage: string = '';


  constructor(
    private navParams: NavParams,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.songs = this.navParams.data['songs'];
    this.albumName = this.navParams.data['albumName'] || 'Álbum';
    this.albumImage = this.navParams.data['albumImage'] || '';

    console.log('recibí: ', this.songs);
  }

  goHome() {
    this.modalCtrl.dismiss().then(() => {
      this.router.navigateByUrl('/menu/home');
    });
  }

  async selectSong(song:any){
    console.log("Cancion seleccionada: ", song)
    await this.modalCtrl.dismiss(song)


  }

}

