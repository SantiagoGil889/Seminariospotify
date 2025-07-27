import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistModalPage } from './artist-modal.page';

describe('ArtistModalPage', () => {
  let component: ArtistModalPage;
  let fixture: ComponentFixture<ArtistModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
