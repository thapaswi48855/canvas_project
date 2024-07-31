import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  // constructor() { }
  private images: HTMLImageElement[] = [];

  addImage(image: HTMLImageElement): void {
    this.images.push(image);
  }

  getImages(): HTMLImageElement[] {
    return this.images;
  }
}
