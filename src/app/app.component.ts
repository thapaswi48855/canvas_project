import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';

interface ImageLayer {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  isResizing: boolean;
  resizeHandleSize: number;
  name: string; // Added property to store image name
  dataUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// export class AppComponent implements AfterViewInit {
//   title = 'canvas_project';
//   showTemplate = false;
//   @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> | undefined;
//   context: CanvasRenderingContext2D | null = null;
//   images: ImageLayer[] = [];
//   selectedImage: ImageLayer | null | undefined = null;
//   dragging: boolean = false;
//   resizing: boolean = false;
//   offsetX: number = 0;
//   offsetY: number = 0;

//   onShowTemplate() {
//     console.log('Template button clicked');
//     this.showTemplate = true;

//     setTimeout(() => {
//       if (this.canvas) {
//         this.context = this.canvas.nativeElement.getContext('2d');
//         console.log('Canvas context initialized:', this.context);
//       }
//     }, 0);
//   }

//   ngAfterViewInit(): void {
//     // Initialization will be done in onShowTemplate
//   }

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     const file = input.files?.[0];

//     if (!file) {
//       console.error('File is missing');
//       return;
//     }

//     if (!this.canvas || !this.context) {
//       console.error('Canvas or context is missing');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const imageLayer: ImageLayer = {
//           img,
//           x: 50,
//           y: 50,
//           width: img.width,
//           height: img.height,
//           isSelected: false,
//           isResizing: false,
//           resizeHandleSize: 10,
//           name: file.name, // Store the file name
//           dataUrl: e.target?.result as string,
//         };
//         this.images.push(imageLayer);
//         this.redrawCanvas();
//         this.updateImageList();
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   }

//   redrawCanvas() {
//     if (!this.canvas || !this.context) {
//       return;
//     }

//     const mycanvas = this.canvas.nativeElement;
//     const context = this.context;

//     context.clearRect(0, 0, mycanvas.width, mycanvas.height);

//     this.images.forEach((imageLayer) => {
//       context.drawImage(
//         imageLayer.img,
//         imageLayer.x,
//         imageLayer.y,
//         imageLayer.width,
//         imageLayer.height
//       );

//       if (imageLayer.isSelected) {
//         context.strokeStyle = 'blue';
//         context.lineWidth = 2;
//         context.strokeRect(
//           imageLayer.x,
//           imageLayer.y,
//           imageLayer.width,
//           imageLayer.height
//         );

//         context.fillStyle = 'white';
//         context.strokeStyle = 'black';
//         context.lineWidth = 1;

//         // Draw resize handles
//         const handles = this.getResizeHandles(imageLayer);
//         handles.forEach((handle) => {
//           context.beginPath();
//           context.arc(
//             handle.x,
//             handle.y,
//             imageLayer.resizeHandleSize,
//             0,
//             2 * Math.PI
//           );
//           context.fill();
//           context.stroke();
//         });
//       }
//     });
//   }

//   getResizeHandles(imageLayer: ImageLayer) {
//     const { x, y, width, height, resizeHandleSize } = imageLayer;
//     const halfSize = resizeHandleSize / 2;
//     return [
//       { x: x - halfSize, y: y - halfSize },
//       { x: x + width - halfSize, y: y - halfSize },
//       { x: x - halfSize, y: y + height - halfSize },
//       { x: x + width - halfSize, y: y + height - halfSize },
//     ];
//   }

//   @HostListener('mousedown', ['$event'])
//   onMouseDown(event: MouseEvent) {
//     if (!this.canvas) return;

//     const rect = this.canvas.nativeElement.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     this.selectedImage = this.images.find(
//       (imageLayer) =>
//         x > imageLayer.x &&
//         x < imageLayer.x + imageLayer.width &&
//         y > imageLayer.y &&
//         y < imageLayer.y + imageLayer.height
//     );

//     if (this.selectedImage) {
//       const handles = this.getResizeHandles(this.selectedImage);
//       const handle = handles.find(
//         (h) =>
//           Math.abs(h.x - x) < this.selectedImage!.resizeHandleSize &&
//           Math.abs(h.y - y) < this.selectedImage!.resizeHandleSize
//       );

//       if (handle) {
//         this.selectedImage.isResizing = true;
//         this.resizing = true;
//       } else {
//         this.selectedImage.isSelected = true;
//         this.dragging = true;
//         this.offsetX = x - this.selectedImage.x;
//         this.offsetY = y - this.selectedImage.y;
//       }

//       this.redrawCanvas();
//     } else {
//       this.images.forEach((imageLayer) => (imageLayer.isSelected = false));
//       this.redrawCanvas();
//     }
//   }

//   @HostListener('mousemove', ['$event'])
//   onMouseMove(event: MouseEvent) {
//     if (!this.selectedImage || !this.canvas) return;

//     const rect = this.canvas.nativeElement.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     if (this.dragging) {
//       this.selectedImage.x = x - this.offsetX;
//       this.selectedImage.y = y - this.offsetY;
//       this.redrawCanvas();
//     } else if (this.resizing) {
//       const width = x - this.selectedImage.x;
//       const height = y - this.selectedImage.y;
//       this.selectedImage.width = width > 0 ? width : 0;
//       this.selectedImage.height = height > 0 ? height : 0;
//       this.redrawCanvas();
//     }
//   }

//   @HostListener('mouseup')
//   onMouseUp() {
//     if (this.selectedImage) {
//       this.selectedImage.isResizing = false;
//       this.selectedImage.isSelected = false;
//     }
//     this.dragging = false;
//     this.resizing = false;
//     this.selectedImage = null;
//     this.redrawCanvas();
//   }

//   updateImageList() {
//     // This function will be called to update the displayed list of image names
//     const imageList = document.getElementById('image-list');
//     if (imageList) {
//       imageList.innerHTML = this.images
//         .map(
//           (imgLayer) =>
//             `<li style="background:#f5f5f5;margin-bottom:5px;font-size: 20px;display: flex; align-items: center;">
//             <img style="margin-right: 13px;" src="${
//               imgLayer.dataUrl
//             }" alt="${this.capitalizeWords(
//               this.removeFileExtension(imgLayer.name)
//             )}" width="30" height="30" />
//             ${this.capitalizeWords(
//               this.removeFileExtension(imgLayer.name)
//             )}</li>`
//         )
//         .join('');
//       console.log('imageList', imageList);
//     }
//   }

//   capitalizeWords(name: string): string {
//     return name
//       .split(' ')
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   }

//   removeFileExtension(name: string): string {
//     return name.replace(/\.[^/.]+$/, '');
//   }

//   public newArray: any = [
//     {
//       id: 103,
//       name: 'p1',
//       price: 1034,
//     },
//     {
//       id: 101,
//       name: 'p2',
//       price: 12,
//     },
//     {
//       id: 102,
//       name: 'p3',
//       price: 11,
//     },
//   ];

//   ngOnInit() {
//     this.sortArray('price');
//     this.repeateletter();
//   }

//   sortArray(key: any) {
//     this.newArray.sort((keys: any, values: any) => {
//       if (keys[key] > values[key]) {
//         return -1;
//       } else if (keys[key] < values[key]) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//   }

//   namevale = 'today is august 1, 2024';
//   cnt = 0;
//   repeateletter() {
//     for (const letter of this.namevale) {
//       if (letter == 'u') {
//         this.cnt += 1;
//       }
//     }
//     console.log(this.cnt)
//   }

// }
export class AppComponent {
  showOffcanvas = false;
  progress = 0;
  toggleButtonText = false;
  interval: any;
  showAlert = false;
  upbutton=false;

  // Start migration process and show the offcanvas
   startMigration(): void {
    this.showOffcanvas = true;
    this.progress = 0;

    // Simulate the progress bar loading
    this.interval = setInterval(async () => {
      if (this.progress < 100) {
        this.progress += 1;
      } else {
        clearInterval(this.interval);
       
        // alert('Migration process has been completed');
        // await this.upbutton();
        this.showOffcanvas = false;
        this.upbutton =false
        this.showAlert = true;
        setTimeout(() => {
          
          this.showAlert = false;
        }, 5000);
      }
    }, 100);
  }

  toggleOffcanvas(): void {
    if (this.showOffcanvas) {
      this.showOffcanvas = false;
      this.toggleButtonText = true;
      this.upbutton =true
    } else {
      this.showOffcanvas = true;
      this.toggleButtonText = false;
    }
  }
}
