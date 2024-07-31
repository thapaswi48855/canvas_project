import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css'],
})
export class ImageLoaderComponent {
  @Input() imageLoaded = new EventEmitter<any>();
  imgSrc:any;
  onFileSelected(event: any) {

// alert('Hi')DF
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = e.target?.result as string; //target.result as string;
        this.imgSrc=img.src;
        img.onload = () => this.imageLoaded.emit(img);
      };
      reader.readAsDataURL(input.files[0]);
    }

  }
}
