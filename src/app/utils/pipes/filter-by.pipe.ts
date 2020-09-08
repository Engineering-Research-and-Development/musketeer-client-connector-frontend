import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

    transform(array: any[], args: any[]): any[] {
        if (!array) return [];

        let searched = args[0];
        let path = args[1];

        if (!searched || searched == '') return array;

        return array.filter(item => {
            const value = _.get(item, path);
            if(typeof value == 'string') return (<string>value).toLowerCase().startsWith(searched.toLowerCase());
            else if(typeof value == 'number') return value == searched;
        });
    }

}
