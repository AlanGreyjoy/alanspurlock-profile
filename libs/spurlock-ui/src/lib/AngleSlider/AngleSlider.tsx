import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

export interface AngleSliderMark {
  value: number;
  label?: React.ReactNode;
}

export interface AngleSliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'onChangeEnd'
  > {
  /** Current value (0-360) */
  value?: number;
  /** Default value for uncontrolled mode */
  defaultValue?: number;
  /** Callback fired when value changes */
  onChange?: (value: number) => void;
  /** Callback fired when user stops dragging or changes value with keyboard */
  onChangeEnd?: (value: number) => void;
  /** Size of the slider circle in pixels */
  size?: number;
  /** Size of the thumb in pixels */
  thumbSize?: number;
  /** Format function for the label */
  formatLabel?: (value: number) => React.ReactNode;
  /** Marks to display on the slider */
  marks?: AngleSliderMark[];
  /** Restrict selection to marks only */
  restrictToMarks?: boolean;
  /** Step value for keyboard navigation */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Accessibility label */
  'aria-label'?: string;
  /** Custom className */
  className?: string;
}

export const AngleSlider = forwardRef<HTMLDivElement, AngleSliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      onChange,
      onChangeEnd,
      size = 100,
      thumbSize = 8,
      formatLabel,
      marks = [],
      restrictToMarks = false,
      step = 1,
      disabled = false,
      'aria-label': ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startAngleRef = useRef<number>(0);
    const startValueRef = useRef<number>(value);

    const updateValue = useCallback(
      (newValue: number, isEnd = false) => {
        // Normalize to 0-360
        let normalizedValue = ((newValue % 360) + 360) % 360;

        // If restrictToMarks is true, snap to nearest mark
        if (restrictToMarks && marks.length > 0) {
          const sortedMarks = [...marks].sort((a, b) => a.value - b.value);
          let nearestMark = sortedMarks[0];
          let minDistance = Math.abs(normalizedValue - sortedMarks[0].value);

          for (const mark of sortedMarks) {
            const distance = Math.abs(normalizedValue - mark.value);
            if (distance < minDistance) {
              minDistance = distance;
              nearestMark = mark;
            }
          }

          normalizedValue = nearestMark.value;
        }

        if (!isControlled) {
          setInternalValue(normalizedValue);
        }
        onChange?.(normalizedValue);
        if (isEnd) {
          onChangeEnd?.(normalizedValue);
        }
      },
      [isControlled, onChange, onChangeEnd, restrictToMarks, marks]
    );

    const getAngleFromPoint = useCallback(
      (clientX: number, clientY: number): number => {
        if (!containerRef.current) return value;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;

        // Calculate angle in degrees (0 at top, clockwise)
        let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;
        if (angle < 0) angle += 360;

        return angle;
      },
      [value]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) return;

        e.preventDefault();
        setIsDragging(true);
        const angle = getAngleFromPoint(e.clientX, e.clientY);
        startAngleRef.current = angle;
        startValueRef.current = value;
        updateValue(angle);
      },
      [disabled, getAngleFromPoint, value, updateValue]
    );

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || disabled) return;

        const angle = getAngleFromPoint(e.clientX, e.clientY);
        let delta = angle - startAngleRef.current;

        // Handle wrap-around: if delta is too large, adjust it
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        let newValue = startValueRef.current + delta;
        // Normalize to 0-360
        newValue = ((newValue % 360) + 360) % 360;

        updateValue(newValue);
      },
      [isDragging, disabled, getAngleFromPoint, updateValue]
    );

    const handleMouseUp = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        onChangeEnd?.(value);
      }
    }, [isDragging, onChangeEnd, value]);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;

        e.preventDefault();
        setIsDragging(true);
        const touch = e.touches[0];
        const angle = getAngleFromPoint(touch.clientX, touch.clientY);
        startAngleRef.current = angle;
        startValueRef.current = value;
        updateValue(angle);
      },
      [disabled, getAngleFromPoint, value, updateValue]
    );

    const handleTouchMove = useCallback(
      (e: TouchEvent) => {
        if (!isDragging || disabled) return;

        e.preventDefault();
        const touch = e.touches[0];
        const angle = getAngleFromPoint(touch.clientX, touch.clientY);
        let delta = angle - startAngleRef.current;

        // Handle wrap-around: if delta is too large, adjust it
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        let newValue = startValueRef.current + delta;
        // Normalize to 0-360
        newValue = ((newValue % 360) + 360) % 360;

        updateValue(newValue);
      },
      [isDragging, disabled, getAngleFromPoint, updateValue]
    );

    const handleTouchEnd = useCallback(() => {
      if (isDragging) {
        setIsDragging(false);
        onChangeEnd?.(value);
      }
    }, [isDragging, onChangeEnd, value]);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('touchmove', handleTouchMove, {
          passive: false,
        });
        document.addEventListener('touchend', handleTouchEnd);
        return () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }, [isDragging, handleTouchMove, handleTouchEnd]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        let newValue = value;

        switch (e.key) {
          case 'ArrowUp':
          case 'ArrowRight':
            e.preventDefault();
            newValue = value + step;
            break;
          case 'ArrowDown':
          case 'ArrowLeft':
            e.preventDefault();
            newValue = value - step;
            break;
          case 'Home':
            e.preventDefault();
            newValue = 0;
            break;
          case 'End':
            e.preventDefault();
            newValue = 359;
            break;
          default:
            return;
        }

        // Normalize to 0-360
        newValue = ((newValue % 360) + 360) % 360;
        updateValue(newValue, true);
      },
      [disabled, value, step, updateValue]
    );

    // Calculate thumb position - short line segment extending inward from edge
    const angleRad = ((value - 90) * Math.PI) / 180;
    const thumbLength = Math.max(8, size * 0.15); // Short line segment, about 15% of size
    const thumbStartRadius = size / 2 - 2; // Start at the edge of the circle
    const thumbEndRadius = thumbStartRadius - thumbLength; // Extend inward

    // Start point (on circle edge)
    const thumbStartX = size / 2 + thumbStartRadius * Math.cos(angleRad);
    const thumbStartY = size / 2 + thumbStartRadius * Math.sin(angleRad);

    // End point (extending inward)
    const thumbEndX = size / 2 + thumbEndRadius * Math.cos(angleRad);
    const thumbEndY = size / 2 + thumbEndRadius * Math.sin(angleRad);

    // Format value: whole numbers or max 2 decimal places
    const formatValue = (val: number): string => {
      // Use parseFloat to automatically remove trailing zeros
      return parseFloat(val.toFixed(2)).toString();
    };

    const displayLabel = formatLabel ? formatLabel(value) : formatValue(value);

    const containerClasses = `inline-flex flex-col items-center ${
      className || ''
    }`;

    return (
      <div ref={ref} className={containerClasses} {...props}>
        <div
          ref={containerRef}
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={value}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`relative rounded-full border-2 border-gray-300 bg-gray-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary transition-shadow ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
          } ${isDragging ? 'cursor-grabbing shadow-lg' : ''}`}
          style={{
            width: size,
            height: size,
          }}
        >
          {/* Marks */}
          {marks.map((mark, index) => {
            const markAngleRad = ((mark.value - 90) * Math.PI) / 180;
            const markRadius = size / 2 - 5;
            const markX = size / 2 + markRadius * Math.cos(markAngleRad);
            const markY = size / 2 + markRadius * Math.sin(markAngleRad);

            return (
              <div
                key={index}
                className="absolute w-1.5 h-1.5 bg-gray-400 rounded-full"
                style={{
                  left: markX - 3,
                  top: markY - 3,
                }}
              />
            );
          })}

          {/* Thumb - short line segment on outer edge */}
          <svg
            className="absolute inset-0 pointer-events-none overflow-visible"
            style={{ width: size, height: size }}
          >
            <line
              x1={thumbStartX}
              y1={thumbStartY}
              x2={thumbEndX}
              y2={thumbEndY}
              stroke="#ff0055"
              strokeWidth={Math.max(3, thumbSize)}
              strokeLinecap="round"
              className={`transition-all ${isDragging ? 'opacity-80' : ''}`}
            />
          </svg>

          {/* Label - positioned in center */}
          {displayLabel !== null && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-base font-semibold text-brand-primary">
                {displayLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

AngleSlider.displayName = 'AngleSlider';

export default AngleSlider;
