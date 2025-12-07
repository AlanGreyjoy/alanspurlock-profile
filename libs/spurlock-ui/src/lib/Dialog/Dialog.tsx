import * as DialogPrimitive from '@radix-ui/react-dialog';
import { forwardRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

export interface DialogProps {
  /** Controls opened state */
  opened: boolean;
  /** Called when dialog is closed */
  onClose: () => void;
  /** Dialog content */
  children: ReactNode;
  /** Dialog title */
  title?: ReactNode;
  /** If set, the close button is rendered */
  withCloseButton?: boolean;
  /** Controls width of the content area */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** If set, the modal is centered vertically */
  centered?: boolean;
  /** If set, the modal/drawer is closed when user clicks on the overlay */
  closeOnClickOutside?: boolean;
  /** If set, onClose is called when user presses the escape key */
  closeOnEscape?: boolean;
  /** Key of theme.spacing or any valid CSS value to set content padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Key of theme.radius or any valid CSS value to set border-radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Key of theme.shadows or any valid CSS box-shadow value */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Props for the overlay */
  overlayProps?: {
    className?: string;
    opacity?: number;
  };
  /** If set, the overlay is rendered */
  withOverlay?: boolean;
}

const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

const shadowClasses = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
};

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      opened,
      onClose,
      children,
      title,
      withCloseButton = true,
      size = 'md',
      centered = true,
      closeOnClickOutside = true,
      closeOnEscape = true,
      padding = 'md',
      radius = 'lg',
      shadow = 'xl',
      overlayProps = {},
      withOverlay = true,
    },
    ref
  ) => {
    const handleOpenChange = (open: boolean) => {
      if (!open) {
        onClose();
      }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnClickOutside) {
        onClose();
      }
    };

    return (
      <DialogPrimitive.Root open={opened} onOpenChange={handleOpenChange}>
        <DialogPrimitive.Portal>
          {withOverlay && (
            <DialogPrimitive.Overlay
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 ${
                overlayProps.className || ''
              }`}
              style={{
                opacity: overlayProps.opacity,
              }}
              onClick={handleOverlayClick}
            />
          )}
          <DialogPrimitive.Content
            ref={ref}
            className={`fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] bg-white border-2 border-gray-900 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] ${sizeClasses[size]} ${radiusClasses[radius]} ${shadowClasses[shadow]}`}
            onEscapeKeyDown={
              closeOnEscape ? () => onClose() : (e) => e.preventDefault()
            }
            onPointerDownOutside={(e) => {
              if (!closeOnClickOutside) {
                e.preventDefault();
              }
            }}
          >
            <div className={paddingClasses[padding]}>
              {(title || withCloseButton) && (
                <div className="flex items-start justify-between mb-4">
                  {title && (
                    <DialogPrimitive.Title className="text-2xl font-bold text-gray-900">
                      {title}
                    </DialogPrimitive.Title>
                  )}
                  {withCloseButton && (
                    <DialogPrimitive.Close
                      className="rounded-md p-1 hover:bg-gray-100 transition-colors ml-auto"
                      onClick={onClose}
                    >
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                  )}
                </div>
              )}
              <div>{children}</div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

Dialog.displayName = 'Dialog';

export default Dialog;
