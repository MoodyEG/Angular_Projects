import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, ...args: any[]): number {
    if (args[0] > 0) {
      value *= (100 - args[0]) / 100;
    }
    return value;
  }
}
