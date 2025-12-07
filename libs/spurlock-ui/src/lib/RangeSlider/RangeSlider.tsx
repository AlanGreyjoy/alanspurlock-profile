import { forwardRef, type ReactNode } from 'react';
import * as Slider from '@radix-ui/react-slider';

export type RangeSliderValue = [number, number];

export interface RangeSliderMark {
  value: number;
  label?: ReactNode;
}

export interface RangeSliderProps {
  /** Key of theme.colors or any valid CSS color, controls color of track and thumb */
  color?: string;
  /** Uncontrolled component default value */
  defaultValue?: RangeSliderValue;
  /** Disables slider */
  disabled?: boolean;
  /** Domain of the slider, defines the full range of possible values */
  domain?: [number, number];
  /** Props passed down to the hidden input */
  hiddenInputProps?: React.ComponentPropsWithoutRef<'input'>;
  /** Determines whether track values representation should be inverted */
  inverted?: boolean;
  /** Function to generate label or any react node to render instead, set to null to disable label */
  label?: ReactNode | ((value: number) => ReactNode);
  /** Determines whether the label should be visible when the slider is not being dragged or hovered */
  labelAlwaysOn?: boolean;
  /** Marks displayed on the track */
  marks?: RangeSliderMark[];
  /** Maximum possible value */
  max?: number;
  /** Maximum range interval */
  maxRange?: number;
  /** Minimal possible value */
  min?: number;
  /** Minimal range interval */
  minRange?: number;
  /** Hidden input name, use with uncontrolled component */
  name?: string;
  /** Called when value changes */
  onChange?: (value: RangeSliderValue) => void;
  /** Called when user stops dragging slider or changes value with arrows */
  onChangeEnd?: (value: RangeSliderValue) => void;
  /** Number of significant digits after the decimal point */
  precision?: number;
  /** Key of theme.radius or any valid CSS value to set border-radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Determines whether the selection should be only allowed from the given marks array */
  restrictToMarks?: boolean;
  /** A transformation function to change the scale of the slider */
  scale?: (value: number) => number;
  /** Determines whether the label should be displayed when the slider is hovered */
  showLabelOnHover?: boolean;
  /** Controls size of the track */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Number by which value will be incremented/decremented with thumb drag and arrows */
  step?: number;
  /** Content rendered inside thumb */
  thumbChildren?: React.ReactNode;
  /** First thumb aria-label */
  thumbFromLabel?: string;
  /** Props passed down to thumb element based on the thumb index */
  thumbProps?: (
    index: 0 | 1
  ) => Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'ref'
  >;
  /** Thumb width and height, by default value is computed based on size prop */
  thumbSize?: string | number;
  /** Second thumb aria-label */
  thumbToLabel?: string;
  /** Controlled value */
  value?: RangeSliderValue;
  /** Additional class name */
  className?: string;
}

export const RangeSlider = forwardRef<HTMLSpanElement, RangeSliderProps>(
  (
    {
      color = '#ff0055',
      defaultValue,
      disabled = false,
      domain,
      hiddenInputProps,
      inverted = false,
      label,
      labelAlwaysOn = false,
      marks = [],
      max = 100,
      maxRange = Infinity,
      min = 0,
      minRange = 10,
      name,
      onChange,
      onChangeEnd,
      precision = 0,
      radius = 'xl',
      restrictToMarks = false,
      scale,
      showLabelOnHover = true,
      size = 'md',
      step = 1,
      thumbChildren,
      thumbFromLabel = 'Minimum value',
      thumbProps,
      thumbSize,
      thumbToLabel = 'Maximum value',
      value,
      className = '',
    },
    ref
  ) => {
    const actualMin = domain ? domain[0] : min;
    const actualMax = domain ? domain[1] : max;

    // Size mappings
    const trackHeightMap = {
      xs: 'h-1',
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-2.5',
      xl: 'h-3',
    };

    const thumbSizeMap = {
      xs: thumbSize || 'w-3 h-3',
      sm: thumbSize || 'w-4 h-4',
      md: thumbSize || 'w-5 h-5',
      lg: thumbSize || 'w-6 h-6',
      xl: thumbSize || 'w-7 h-7',
    };

    const radiusMap = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    };

    // Format value based on precision
    const formatValue = (val: number): string => {
      return val.toFixed(precision);
    };

    // Generate label
    const getLabel = (val: number): ReactNode => {
      if (label === null) return null;
      if (typeof label === 'function') return label(val);
      if (label) return label;
      return formatValue(val);
    };

    // Handle value change with constraints
    const handleValueChange = (newValue: number[]) => {
      if (newValue.length !== 2) return;

      let [newMin, newMax] = newValue as RangeSliderValue;

      // Apply scale if provided
      if (scale) {
        newMin = scale(newMin);
        newMax = scale(newMax);
      }

      // Enforce min/max range constraints
      const currentRange = newMax - newMin;
      if (currentRange < minRange) {
        return; // Prevent update if range is too small
      }
      if (currentRange > maxRange) {
        return; // Prevent update if range is too large
      }

      // Restrict to marks if enabled
      if (restrictToMarks && marks.length > 0) {
        const markValues = marks.map((m) => m.value);
        const nearestMin = markValues.reduce((prev, curr) =>
          Math.abs(curr - newMin) < Math.abs(prev - newMin) ? curr : prev
        );
        const nearestMax = markValues.reduce((prev, curr) =>
          Math.abs(curr - newMax) < Math.abs(prev - newMax) ? curr : prev
        );
        newMin = nearestMin;
        newMax = nearestMax;
      }

      onChange?.([newMin, newMax]);
    };

    const handleValueCommit = (newValue: number[]) => {
      if (newValue.length !== 2) return;
      onChangeEnd?.(newValue as RangeSliderValue);
    };

    const trackHeight = trackHeightMap[size];
    const thumbSizeClass =
      typeof thumbSize === 'string' ? thumbSize : thumbSizeMap[size];
    const radiusClass = radiusMap[radius];

    // Calculate mark positions
    const getMarkPosition = (markValue: number) => {
      return ((markValue - actualMin) / (actualMax - actualMin)) * 100;
    };

    return (
      <div className={`relative w-full py-4 ${className}`}>
        <Slider.Root
          ref={ref}
          className="relative flex items-center select-none touch-none w-full"
          defaultValue={defaultValue}
          value={value}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          min={actualMin}
          max={actualMax}
          step={restrictToMarks && marks.length > 0 ? undefined : step}
          disabled={disabled}
          inverted={inverted}
          minStepsBetweenThumbs={Math.ceil(minRange / step)}
          name={name}
        >
          <Slider.Track
            className={`bg-gray-300 relative grow ${trackHeight} ${radiusClass} ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Slider.Range
              className={`absolute ${trackHeight} ${radiusClass}`}
              style={{ backgroundColor: color }}
            />

            {/* Marks */}
            {marks.map((mark, index) => {
              const position = getMarkPosition(mark.value);
              return (
                <div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-gray-500 -translate-x-1/2"
                    style={{
                      backgroundColor:
                        value &&
                        mark.value >= value[0] &&
                        mark.value <= value[1]
                          ? color
                          : undefined,
                    }}
                  />
                  {mark.label && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
                      {mark.label}
                    </div>
                  )}
                </div>
              );
            })}
          </Slider.Track>

          {/* First Thumb */}
          <Slider.Thumb
            className={`group block ${thumbSizeClass} ${radiusClass} bg-white border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              disabled
                ? 'cursor-not-allowed'
                : 'cursor-grab active:cursor-grabbing hover:scale-110'
            }`}
            style={{ borderColor: color }}
            aria-label={thumbFromLabel}
            {...(thumbProps ? thumbProps(0) : {})}
          >
            {thumbChildren}
            {!labelAlwaysOn && showLabelOnHover && label !== null && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div
                  className="px-2 py-1 text-xs text-white rounded whitespace-nowrap"
                  style={{ backgroundColor: color }}
                >
                  {value && getLabel(value[0])}
                </div>
              </div>
            )}
            {labelAlwaysOn && label !== null && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
                <div
                  className="px-2 py-1 text-xs text-white rounded whitespace-nowrap"
                  style={{ backgroundColor: color }}
                >
                  {value && getLabel(value[0])}
                </div>
              </div>
            )}
          </Slider.Thumb>

          {/* Second Thumb */}
          <Slider.Thumb
            className={`group block ${thumbSizeClass} ${radiusClass} bg-white border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
              disabled
                ? 'cursor-not-allowed'
                : 'cursor-grab active:cursor-grabbing hover:scale-110'
            }`}
            style={{ borderColor: color }}
            aria-label={thumbToLabel}
            {...(thumbProps ? thumbProps(1) : {})}
          >
            {thumbChildren}
            {!labelAlwaysOn && showLabelOnHover && label !== null && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div
                  className="px-2 py-1 text-xs text-white rounded whitespace-nowrap"
                  style={{ backgroundColor: color }}
                >
                  {value && getLabel(value[1])}
                </div>
              </div>
            )}
            {labelAlwaysOn && label !== null && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
                <div
                  className="px-2 py-1 text-xs text-white rounded whitespace-nowrap"
                  style={{ backgroundColor: color }}
                >
                  {value && getLabel(value[1])}
                </div>
              </div>
            )}
          </Slider.Thumb>
        </Slider.Root>

        {/* Hidden inputs for form submission */}
        {name && (
          <>
            <input
              type="hidden"
              name={`${name}-min`}
              value={value ? value[0] : defaultValue?.[0] ?? actualMin}
              {...hiddenInputProps}
            />
            <input
              type="hidden"
              name={`${name}-max`}
              value={value ? value[1] : defaultValue?.[1] ?? actualMax}
              {...hiddenInputProps}
            />
          </>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;
