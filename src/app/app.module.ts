import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { LayersnamesPipe } from './layersnames.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ImageLoaderComponent,
    LayersnamesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
