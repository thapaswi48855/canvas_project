import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CanvasImage } from '../canvas_interface.model'; // Import the CanvasImage interface

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  @Input() images: any[] = [];// Use CanvasImage interface
  // @Input() images: HTMLImageElement[] = [];
  private ctx!: CanvasRenderingContext2D |any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.canvas && this.canvas.nativeElement) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
      if (this.ctx) {
        this.drawImages();
      } else {
        console.error('Failed to get 2D context from canvas.');
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && this.ctx) {
      this.drawImages();
    }
  }

  // private drawImages(): void {
  //   if (this.ctx && this.canvas && this.canvas.nativeElement) {
  //     this.ctx.clearRect(
  //       0,
  //       0,
  //       this.canvas.nativeElement.width,
  //       this.canvas.nativeElement.height
  //     );

  //     this.images.forEach((imageObj) => {
  //       if (imageObj && imageObj.image) {
  //         // Ensure the image element is fully loaded
  //         if (imageObj.image.complete && imageObj.image.naturalWidth > 0) {
  //           this.ctx.drawImage(
  //             imageObj.image,
  //             imageObj.x,
  //             imageObj.y,
  //             imageObj.width,
  //             imageObj.height
  //           );
  //         } else {
  //           console.error('Image is not fully loaded or has invalid dimensions:', imageObj);
  //         }
  //       } else {
  //         console.error('Image object or image is missing:', imageObj);
  //       }
  //     });
  //   } else {
  //     console.error('Canvas context or canvas element is null.');
  //   }
  // }
  private drawImages(): void {
    console.log('Drawing images', this.images);
    if (this.ctx && this.canvas && this.canvas.nativeElement) {
      this.ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
  
      this.images.forEach((imageObj) => {
        console.log('Image object', imageObj);
        if (imageObj && imageObj.image) {
          if (imageObj.image.complete && imageObj.image.naturalWidth > 0) {
            this.ctx.drawImage(
              imageObj.image,
              imageObj.x,
              imageObj.y,
              imageObj.width,
              imageObj.height
            );
          } else {
            console.error('Image is not fully loaded:', imageObj);
          }
        } else {
          console.error('Image object or image is missing:', imageObj);
        }
      });
    } else {
      console.error('Canvas context or canvas element is null.');
    }
  }
  
}
