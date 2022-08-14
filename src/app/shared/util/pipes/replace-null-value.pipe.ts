import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'replaceNullValue',
    pure: false
})
export class ReplaceNullValuePipe implements PipeTransform {
    public transform(value: any, pattern = ""): any {
        return ((value === null) ? '-' : value);
    }
}
