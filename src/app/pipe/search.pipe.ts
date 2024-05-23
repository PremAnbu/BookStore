import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchString: string) {
    if(!items) return []
    if(!searchString) return items
    searchString = searchString.toLowerCase()
    const filterNotes=items.filter((item: {title: string, description: string}) => item.title.toLowerCase().includes(searchString) || item.description.toLowerCase().includes(searchString));
    console.log(filterNotes);
    return filterNotes
    
  }

}
