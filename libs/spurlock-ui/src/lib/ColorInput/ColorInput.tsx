import * as Popover from '@radix-ui/react-popover';
import * as Slider from '@radix-ui/react-slider';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Pipette, ChevronDown } from 'lucide-react';
import {
  type ColorFormat,
  type RGBA,
  type HSLA,
  detectFormat,
  formatColor,
  parseColor,
  rgbToHsl,
  hslToRgb,
} from './colorUtils';

export interface ColorInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange' | 'value'
  > {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label */
  label?: string;
  /** Optional helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Callback when user stops interacting */
  onChangeEnd?: (value: string) => void;
  /** Color format */
  format?: ColorFormat;
  /** Predefined color swatches */
  swatches?: string[];
  /** Number of swatches per row */
  swatchesPerRow?: number;
  /** Show color picker dropdown */
  withPicker?: boolean;
  /** Show eye dropper */
  withEyeDropper?: boolean;
  /** Disable free input */
  disallowInput?: boolean;
  /** Fix invalid value on blur */
  fixOnBlur?: boolean;
  /** Close dropdown on swatch click */
  closeOnColorSwatchClick?: boolean;
  /** Custom eye dropper icon */
  eyeDropperIcon?: React.ReactNode;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  (
    {
      className = '',
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      value: controlledValue,
      defaultValue = '',
      onChange,
      onChangeEnd,
      format: controlledFormat,
      swatches = [],
      swatchesPerRow = 7,
      withPicker = true,
      withEyeDropper = true,
      disallowInput = false,
      fixOnBlur = true,
      closeOnColorSwatchClick = false,
      eyeDropperIcon,
      id,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [inputValue, setInputValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastValidValue, setLastValidValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const format = controlledFormat || detectFormat(value || '#000000');

    // Parse current color
    const currentColor = parseColor(value || '#000000') || {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    };
    const hsl = rgbToHsl(currentColor);

    // Update internal state
    useEffect(() => {
      if (value !== inputValue) {
        setInputValue(value);
      }
    }, [value]);

    // Update value
    const updateValue = useCallback(
      (newValue: string, isEnd = false) => {
        const parsed = parseColor(newValue);
        if (!parsed) return;

        const formatted = formatColor(parsed, format);
        setInputValue(formatted);
        setLastValidValue(formatted);

        if (!isControlled) {
          setInternalValue(formatted);
        }
        onChange?.(formatted);
        if (isEnd) {
          onChangeEnd?.(formatted);
        }
      },
      [format, isControlled, onChange, onChangeEnd]
    );

    // Handle input change
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        const parsed = parseColor(newValue);
        if (parsed) {
          const formatted = formatColor(parsed, format);
          setLastValidValue(formatted);
          if (!isControlled) {
            setInternalValue(formatted);
          }
          onChange?.(formatted);
        }
      },
      [format, isControlled, onChange]
    );

    // Handle input blur
    const handleInputBlur = useCallback(() => {
      if (fixOnBlur) {
        const parsed = parseColor(inputValue);
        if (!parsed) {
          setInputValue(lastValidValue);
          if (!isControlled) {
            setInternalValue(lastValidValue);
          }
        } else {
          const formatted = formatColor(parsed, format);
          setInputValue(formatted);
          setLastValidValue(formatted);
          if (!isControlled) {
            setInternalValue(formatted);
          }
          onChange?.(formatted);
        }
      }
      onChangeEnd?.(inputValue);
    }, [
      fixOnBlur,
      inputValue,
      lastValidValue,
      format,
      isControlled,
      onChange,
      onChangeEnd,
    ]);

    // Handle saturation/hue picker
    const handleSaturationChange = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        const y = Math.max(
          0,
          Math.min(1, (e.clientY - rect.top) / rect.height)
        );

        const newHsl = {
          h: hsl.h,
          s: x,
          l: 1 - y,
          a: currentColor.a,
        };

        const newRgb = hslToRgb(newHsl as HSLA);
        const formatted = formatColor(newRgb, format);
        updateValue(formatted);
      },
      [hsl.h, currentColor.a, format, updateValue]
    );

    // Handle saturation drag
    const [isDraggingSaturation, setIsDraggingSaturation] = useState(false);
    const handleSaturationMouseDown = useCallback(() => {
      setIsDraggingSaturation(true);
    }, []);

    useEffect(() => {
      if (isDraggingSaturation) {
        const handleMouseMove = (e: MouseEvent) => {
          const saturationEl = document.querySelector(
            '[data-saturation-picker]'
          );
          if (saturationEl) {
            const rect = saturationEl.getBoundingClientRect();
            const x = Math.max(
              0,
              Math.min(1, (e.clientX - rect.left) / rect.width)
            );
            const y = Math.max(
              0,
              Math.min(1, (e.clientY - rect.top) / rect.height)
            );

            const newHsl = {
              h: hsl.h,
              s: x,
              l: 1 - y,
              a: currentColor.a,
            };

            const newRgb = hslToRgb(newHsl as HSLA);
            const formatted = formatColor(newRgb, format);
            updateValue(formatted);
          }
        };

        const handleMouseUp = () => {
          setIsDraggingSaturation(false);
          onChangeEnd?.(value);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [
      isDraggingSaturation,
      hsl.h,
      currentColor.a,
      format,
      updateValue,
      value,
      onChangeEnd,
    ]);

    // Handle hue change
    const handleHueChange = useCallback(
      (values: number[]) => {
        const newHsl = {
          h: values[0],
          s: hsl.s,
          l: hsl.l,
          a: currentColor.a,
        };
        const newRgb = hslToRgb(newHsl as HSLA);
        const formatted = formatColor(newRgb, format);
        updateValue(formatted);
      },
      [hsl.s, hsl.l, currentColor.a, format, updateValue]
    );

    // Handle alpha change
    const handleAlphaChange = useCallback(
      (values: number[]) => {
        const newColor = {
          ...currentColor,
          a: values[0] / 100,
        };
        const formatted = formatColor(newColor, format);
        updateValue(formatted);
      },
      [currentColor, format, updateValue]
    );

    // Handle swatch click
    const handleSwatchClick = useCallback(
      (swatchColor: string) => {
        updateValue(swatchColor, true);
        if (closeOnColorSwatchClick) {
          setIsOpen(false);
        }
      },
      [updateValue, closeOnColorSwatchClick]
    );

    // Handle eye dropper
    const handleEyeDropper = useCallback(async () => {
      if (!('EyeDropper' in window)) {
        return;
      }

      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        updateValue(result.sRGBHex, true);
      } catch (err) {
        // User cancelled or error
      }
    }, [updateValue]);

    // Size styles
    const sizeStyles = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-14 text-lg',
    };

    const paddingStyles = {
      sm: 'px-3',
      md: 'px-4',
      lg: 'px-5',
    };

    const borderStyles = error
      ? 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500'
      : 'border-gray-300 focus-visible:border-brand-secondary focus-visible:ring-brand-secondary hover:border-gray-400';

    const baseInputStyles =
      'w-full rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent';

    const inputClasses = `${baseInputStyles} ${sizeStyles[size]} ${borderStyles} ${className}`;

    const previewColor = formatColor(currentColor, 'hex');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
          >
            {label}
          </label>
        )}
        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger asChild>
            <div
              className={`relative flex items-center ${
                paddingStyles[size]
              } border-2 rounded-md ${
                error
                  ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
                  : 'border-gray-300 hover:border-gray-400 focus-within:border-brand-secondary focus-within:ring-brand-secondary'
              } focus-within:ring-2 focus-within:ring-offset-2 transition-colors cursor-pointer`}
            >
              {/* Color preview */}
              <div
                className="w-5 h-5 rounded border border-gray-300 flex-shrink-0"
                style={{ backgroundColor: previewColor }}
              />
              <div className="w-2 flex-shrink-0" />
              {/* Input */}
              <input
                ref={ref}
                id={id}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                disabled={disallowInput || props.disabled}
                readOnly={disallowInput}
                className={`${inputClasses} flex-1 min-w-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 bg-transparent`}
                {...props}
              />
              {/* Right section */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {withEyeDropper && 'EyeDropper' in window && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEyeDropper();
                    }}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label="Pick color from screen"
                  >
                    {eyeDropperIcon || <Pipette className="h-4 w-4" />}
                  </button>
                )}
                {withPicker && (
                  <Popover.Trigger asChild>
                    <button
                      type="button"
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      aria-label="Open color picker"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </Popover.Trigger>
                )}
              </div>
            </div>
          </Popover.Trigger>
          {withPicker && (
            <Popover.Portal>
              <Popover.Content
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 w-[240px]"
                sideOffset={5}
                align="start"
              >
                {/* Saturation picker */}
                <div
                  data-saturation-picker
                  className="w-full h-32 rounded mb-2 relative cursor-crosshair overflow-hidden"
                  style={{
                    background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsl.h}, 100%, 50%))`,
                  }}
                  onMouseDown={handleSaturationMouseDown}
                  onClick={handleSaturationChange}
                >
                  <div
                    className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none"
                    style={{
                      left: `${hsl.s * 100}%`,
                      top: `${(1 - hsl.l) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>

                {/* Hue slider */}
                <div className="mb-2">
                  <Slider.Root
                    value={[hsl.h]}
                    onValueChange={handleHueChange}
                    onValueCommit={() => onChangeEnd?.(value)}
                    min={0}
                    max={360}
                    step={1}
                    className="relative flex items-center w-full h-5"
                  >
                    <Slider.Track className="relative flex-1 h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-magenta-500 to-red-500">
                      <Slider.Range className="absolute h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-400 rounded-full shadow-md hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                  </Slider.Root>
                </div>

                {/* Alpha slider (only for formats with alpha) */}
                {(format === 'hexa' ||
                  format === 'rgba' ||
                  format === 'hsla') && (
                  <div className="mb-2">
                    <Slider.Root
                      value={[currentColor.a * 100]}
                      onValueChange={handleAlphaChange}
                      onValueCommit={() => onChangeEnd?.(value)}
                      min={0}
                      max={100}
                      step={1}
                      className="relative flex items-center w-full h-5"
                    >
                      <Slider.Track className="relative flex-1 h-2 rounded-full bg-gray-200">
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${previewColor}00, ${previewColor}ff)`,
                          }}
                        />
                        <Slider.Range className="absolute h-full rounded-full" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-400 rounded-full shadow-md hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                    </Slider.Root>
                  </div>
                )}

                {/* Swatches */}
                {swatches.length > 0 && (
                  <div
                    className="grid gap-1.5"
                    style={{
                      gridTemplateColumns: `repeat(${swatchesPerRow}, minmax(0, 1fr))`,
                    }}
                  >
                    {swatches.map((swatch, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full aspect-square rounded border border-gray-300 hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: swatch }}
                        onClick={() => handleSwatchClick(swatch)}
                        aria-label={`Select color ${swatch}`}
                      />
                    ))}
                  </div>
                )}
              </Popover.Content>
            </Popover.Portal>
          )}
        </Popover.Root>
        {(helperText || errorMessage) && (
          <p
            className={`mt-1.5 text-sm ${
              error ? 'text-red-600' : 'text-[var(--color-text-muted)]'
            }`}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

ColorInput.displayName = 'ColorInput';

export default ColorInput;
