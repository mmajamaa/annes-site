import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter'
})
export class MyfilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => {
      //console.log(item)
      //console.log(item.gallery.indexOf(filter.gallery) !== -1)
      item.gallery.indexOf(filter.gallery) !== -1
    });
  }

}
