import { Injectable } from '@angular/core';
import * as dataArtist from './artistas.json';
import * as songsData from './songs.json';


@Injectable({
  providedIn: 'root'
})
export class MusicService {
  urlServer: string = "https://music.fly.dev";

  songs: any[] = (songsData as any).songs;

  constructor() {}

  getTracks() {
    return fetch(`${this.urlServer}/tracks`).then(res => res.json());
  }

  getAlbums() {
    return fetch(`${this.urlServer}/albums`).then(res => res.json());
  }

  getLocalArtists() {
    return dataArtist;
  }

  getSongsByAlbum(albumId: string) {
    return fetch(`${this.urlServer}/tracks/album/${albumId}`).then(res => res.json());
  }

  getSongsByArtist(nombre: string): any[] {
  return this.songs.filter(song => {
    const artistaCancion = song.artist?.toLowerCase?.();
    const artistaBuscado = nombre?.toLowerCase?.();
    return artistaCancion === artistaBuscado;
  });
}



}
