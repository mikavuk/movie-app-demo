import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor {
  selectOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  value: number = 1;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  updateValue(value: number) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
