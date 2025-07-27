import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MusicService } from '../services/music.service';

@Component({
  selector: 'app-artist-modal',
  templateUrl: './artist-modal.page.html',
  styleUrls: ['./artist-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ArtistModalPage implements OnInit {
  @Input() artist: any;

  artistName: string = '';
  artistImage: string = '';
  songs: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private musicService: MusicService
  ) {}

  ngOnInit() {
    if (this.artist) {
      this.artistName = this.artist.nombre;
      this.artistImage = this.getArtistImage(this.artistName);
      this.songs = this.musicService.getSongsByArtist(this.artistName);
    }
  }

  getArtistImage(nombre: string): string {
    const fileName = nombre.toLowerCase().replace(/ /g, '_');
    return `assets/img/artists/${fileName}.jpg`;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  openPreview(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
