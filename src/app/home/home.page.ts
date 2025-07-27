import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';
import { ArtistModalPage } from '../artist-modal/artist-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {

  colorClaro = 'var(--tema-claro-fondo)';
  colorOscuro = 'var(--tema-oscuro-fondo)';
  colorTextoClaro = 'var(--tema-claro-texto)';
  colorTextoOscuro = 'var(--tema-oscuro-texto)';
  colorActual = this.colorClaro;
  textoActual = this.colorTextoClaro;

  genres = [
  {
    tittle:"Hip-Hop / Rap Argentino",
    image:"https://images.pagina12.com.ar/styles/focal_3_2_700x467/public/2023-02/697824-mike-20dee-2c-20samu-2c-20pinta-20ruido-2c-20weeds-203x2.jpg?h=10d202d3&itok=XZqO-Mx3",
    description: "El Hip-hop/rap argentino ha ganado fuerza con una identidad única, combinando lírica cruda y ritmos urbanos con influencias locales. Artistas como CRO encabezan esta nueva ola, fusionando trap, R&B y rap con una impronta auténtica que representa las calles, las vivencias y la cultura joven del país."
  },
  {
    tittle:"Pop Colombiano",
    image:"https://novedadesandrescepeda.wordpress.com/wp-content/uploads/2018/08/75d55-biograf25c325ada2bde2bandr25c325a9s2bcepeda.jpg?w=245&h=145",
    description: "El pop colombiano destaca por su sensibilidad melódica y letras que conectan con las emociones del día a día. Artistas como Andrés Cepeda han sido clave en consolidar un sonido propio, que mezcla balada, pop y matices tropicales, llevando la música colombiana a nuevas generaciones con elegancia y sentimiento."
  },
  {
    tittle:"Trap Latino",
    image:"https://scontent.fbaq13-1.fna.fbcdn.net/v/t1.6435-9/71004698_3449953121682292_7618181478022643712_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=yjTr0UhI6SEQ7kNvwF_eJwO&_nc_oc=AdlTHP610re0qacfCYJzdr-17O8WZOcNOxQY0EIUNB-LjL2_ooT0sdsnlJu-o4OySOk&_nc_zt=23&_nc_ht=scontent.fbaq13-1.fna&_nc_gid=0Ctuk2DolOHUom8jz37X-A&oh=00_AfT6p1nBIAEpM5bMrbbj_jQfctIqw1cJd93k0n6yhlJZOw&oe=68AB3BCD",
    description: "El trap latino se ha consolidado como una de las voces más potentes de la música urbana, con letras que reflejan realidades crudas, ambiciones y estilo de vida. Artistas como Eladio Carrión lideran esta escena junto a figuras como Anuel AA, Myke Towers y Bryant Myers, fusionando sonidos oscuros, flows versátiles y una estética callejera que ha conquistado audiencias en todo el mundo-"
  },
  {
    tittle:"Regueton Urbano",
    image:"https://wallpapercave.com/wp/wp2013670.jpg",
    description: "El reguetón urbano es el ritmo que revolucionó la música latina, combinando beats pegajosos, letras atrevidas y una energía contagiosa que domina pistas de baile en todo el mundo. Nacido en las calles de Puerto Rico, ha evolucionado con artistas como Daddy Yankee, Don Omar, Wisin & Yandel, y ha sido renovado por nuevas generaciones como Bad Bunny, J Balvin, Rauw Alejandro y Karol G, llevando el género a una escala global sin perder su esencia callejera."
  }
  ]

  tracks: any;
  albums: any;
  artists: any;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private musicService: MusicService,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    this.getLocalArtists();
    this.loadTracks();
    this.loadAlbums();
    await this.loadStorageData();
    this.simularCargaDatos();
  }

  loadTracks() {
    this.musicService.getTracks().then(tracks => {
      this.tracks = tracks;
      console.log(this.tracks, "Las canciones");
    });
  }

  loadAlbums() {
    this.musicService.getAlbums().then(albums => {
      this.albums = albums;
      console.log(this.albums, "Los Albums mas escuchados");
    });
  }

  async cambiarColor() {
    const esClaro = this.colorActual === this.colorClaro;
    this.colorActual = esClaro ? this.colorOscuro : this.colorClaro;
    this.textoActual = esClaro ? this.colorTextoOscuro : this.colorTextoClaro;
    await this.storageService.set('theme', this.colorActual);
    await this.storageService.set('textColor', this.textoActual);
    console.log('Tema Guardado: ', this.colorActual, 'Texto:', this.textoActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    const savedTextColor = await this.storageService.get('textColor');

    if (savedTheme) {
      this.colorActual = savedTheme;
    }
    if (savedTextColor) {
      this.textoActual = savedTextColor;
    }
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('Datos simulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(['Rock', 'Trap', 'Regueton']);
      }, 1500);
    });
  }

  getLocalArtists() {
    this.artists = this.musicService.getLocalArtists();
    console.log(this.artists.artists);
  }

  async showSongs(albumId: string) {
    console.log("album id: ", albumId);

    const songs = await this.musicService.getSongsByAlbum(albumId);
    const album = this.albums.find((a: any) => String(a.id) === String(albumId));
    const albumName = album ? album.name : 'Álbum';
    const albumImage = album ? album.image : '';

    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs,
        albumName: albumName,
        albumImage: albumImage
      }
    });

    await modal.present();
  }

  async showArtistModal(artist: any) {
  console.log('Modal para el artista:', artist);

  const songs = await this.musicService.getSongsByArtist(artist.nombre);
  const artistName = artist.nombre || 'Artista';
  const artistImage = this.getArtistImage(artist.nombre);

  const modal = await this.modalCtrl.create({
    component: ArtistModalPage,
    componentProps: {
      songs: songs,
      artistName: artistName,
      artistImage: artistImage
    }
  });

    await modal.present();
  }

  


  getArtistImage(nombre: string): string {
    const nombreFormateado = encodeURIComponent(nombre);
    return `https://ui-avatars.com/api/?name=${nombreFormateado}&background=random`;
  }

  goIntro() {
    console.log("Volver");
    this.router.navigateByUrl("/intro");
    this.storageService.remove("home");
  }
}
