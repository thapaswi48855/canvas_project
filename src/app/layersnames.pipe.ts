import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'layersnames'
})
export class LayersnamesPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (!value) return value;

    return value.replace(/\b\w/g, (firstLetter:any) => firstLetter.toUpperCase());
  }

}
