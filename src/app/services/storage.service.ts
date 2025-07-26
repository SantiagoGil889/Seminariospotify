import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  // Inicialización debe ser llamada manualmente desde donde se necesite
  public async init() {
    this._storage = await this.storage.create();
  }

  private async ready(): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
  }

  public async set(key: string, value: any): Promise<void> {
    await this.ready();
    await this._storage?.set(key, value);
  }

  public async get<T = any>(key: string): Promise<T | null> {
    await this.ready();
    return this._storage?.get(key) ?? null;
  }

  public async remove(key: string): Promise<void> {
    await this.ready();
    await this._storage?.remove(key);
  }

  public async clear(): Promise<void> {
    await this.ready();
    await this._storage?.clear();
  }

  public async keys(): Promise<string[] | undefined> {
    await this.ready();
    return this._storage?.keys();
  }

  public async length(): Promise<number | undefined> {
    await this.ready();
    return this._storage?.length();
  }
}
