import {
  Component,
  Input,
  Output,
  EventEmitter,
  Optional,
  Self,
  forwardRef,
  Inject,
  Injector,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent<T extends string | number> implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() submitted = false;
  @Input() errorMessage?: string;

  value?: T;

  @Output() valueChange = new EventEmitter<T>();

  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Inject(Injector) @Optional() @Self() public ngControl: NgControl) {}

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;

    const parsed = this.type === 'number' ? (Number(rawValue) as T) : (rawValue as T);
    this.value = parsed;

    this.onChange(parsed);
    this.valueChange.emit(parsed);
  }

  onBlur(): void {
    this.onTouched();
  }

  get showError(): boolean {
    const control = this.ngControl?.control;
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  get errorText(): string | null {
    const control = this.ngControl?.control;
    if (!control || !control.errors) return null;

    if (control.errors['required']) return 'This field is required.';
    if (control.errors['minlength']) return 'Input is too short.';
    return this.errorMessage ?? 'Invalid input.';
  }
}
