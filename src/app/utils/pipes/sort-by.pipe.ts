import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(array: any[], ...args: any[]): any[] {

        /** the object key to perform sorting on */
        let field = args[0];
        /** sorting logic, 'asc' or 'desc' */
        let logic = args[1];

        return array.sort((a, b) => {
            let result = Date.parse(a[field]) - Date.parse(b[field]);
            return logic == 'asc' ? result : -result;
        });
    }

}
