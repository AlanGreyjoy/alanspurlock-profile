import { forwardRef, useCallback, useRef, useState } from 'react';
import { Upload, X, File, Image, FileText, FileVideo } from 'lucide-react';

/**
 * Represents a file with metadata for display
 */
export interface FileItem {
  id: string;
  file: File;
  preview?: string;
}

/**
 * A drag-and-drop file input component with preview support, file validation, and multiple file handling.
 *
 * @example
 * ```tsx
 * <FileInput
 *   label="Upload Documents"
 *   multiple
 *   maxSize={5 * 1024 * 1024}
 *   maxFiles={3}
 *   accept="image/*"
 *   onChange={(files) => console.log(files)}
 * />
 * ```
 */
export interface FileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'value' | 'onChange'
  > {
  /**
   * Size variant of the drop zone
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label text displayed above the file input
   */
  label?: string;
  /**
   * Helper text displayed below the input (not shown when error is present)
   */
  helperText?: string;
  /**
   * Whether the input is in an error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message displayed below the input when error is true
   */
  errorMessage?: string;
  /**
   * Callback fired when files are added or removed
   */
  onChange?: (files: FileItem[]) => void;
  /**
   * Current files array (for controlled component)
   */
  value?: FileItem[];
  /**
   * Maximum file size in bytes. Files exceeding this will be rejected.
   */
  maxSize?: number;
  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;
  /**
   * Show image previews for uploaded image files
   * @default true
   */
  showPreviews?: boolean;
  /**
   * Enable drag and drop functionality
   * @default true
   */
  enableDragDrop?: boolean;
  /**
   * Custom icon to display in the upload area
   */
  uploadIcon?: React.ReactNode;
  /**
   * Display file size below each file
   * @default true
   */
  showFileSize?: boolean;
  /**
   * Display file MIME type below each file
   * @default false
   */
  showFileType?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />;
  if (fileType.startsWith('video/')) return <FileVideo className="h-5 w-5" />;
  if (fileType.includes('pdf') || fileType.includes('document'))
    return <FileText className="h-5 w-5" />;
  return <File className="h-5 w-5" />;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className = '',
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      onChange,
      value: controlledValue,
      maxSize,
      maxFiles,
      showPreviews = true,
      enableDragDrop = true,
      uploadIcon,
      showFileSize = true,
      showFileType = false,
      id,
      multiple = false,
      accept,
      ...props
    },
    ref
  ) => {
    const [internalFiles, setInternalFiles] = useState<FileItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const files = isControlled ? controlledValue : internalFiles;

    // Size styles
    const sizeStyles = {
      sm: 'text-sm py-6',
      md: 'text-base py-8',
      lg: 'text-lg py-10',
    };

    const borderStyles = error
      ? 'border-red-500'
      : isDragging
      ? 'border-brand-secondary bg-brand-secondary/5'
      : 'border-gray-300 hover:border-gray-400';

    // Process files
    const processFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList) return;

        const newFiles: FileItem[] = [];
        const currentFileCount = files.length;

        Array.from(fileList).forEach((file) => {
          // Check max files
          if (maxFiles && currentFileCount + newFiles.length >= maxFiles) {
            return;
          }

          // Check max size
          if (maxSize && file.size > maxSize) {
            return;
          }

          const fileItem: FileItem = {
            id: `${Date.now()}-${file.name}`,
            file,
          };

          // Generate preview for images
          if (showPreviews && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
              fileItem.preview = reader.result as string;
              // Trigger re-render
              if (!isControlled) {
                setInternalFiles((prev) => [...prev]);
              }
            };
            reader.readAsDataURL(file);
          }

          newFiles.push(fileItem);
        });

        const updatedFiles = [...files, ...newFiles];

        if (!isControlled) {
          setInternalFiles(updatedFiles);
        }
        onChange?.(updatedFiles);
      },
      [files, maxFiles, maxSize, showPreviews, isControlled, onChange]
    );

    // Handle file input change
    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
        // Reset input value to allow selecting the same file again
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
      [processFiles]
    );

    // Handle remove file
    const handleRemoveFile = useCallback(
      (fileId: string) => {
        const updatedFiles = files.filter((f) => f.id !== fileId);
        if (!isControlled) {
          setInternalFiles(updatedFiles);
        }
        onChange?.(updatedFiles);
      },
      [files, isControlled, onChange]
    );

    // Handle drag events
    const handleDragEnter = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (enableDragDrop) {
          setIsDragging(true);
        }
      },
      [enableDragDrop]
    );

    const handleDragLeave = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      []
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (enableDragDrop) {
          processFiles(e.dataTransfer.files);
        }
      },
      [enableDragDrop, processFiles]
    );

    // Handle click on drop zone
    const handleDropZoneClick = useCallback(() => {
      inputRef.current?.click();
    }, []);

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

        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-md transition-colors cursor-pointer ${borderStyles} ${sizeStyles[size]} ${className}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropZoneClick}
        >
          <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
            {uploadIcon || (
              <Upload
                className={`${
                  size === 'sm'
                    ? 'h-8 w-8'
                    : size === 'lg'
                    ? 'h-12 w-12'
                    : 'h-10 w-10'
                } text-[var(--color-text-muted)]`}
              />
            )}
            <div className="text-center">
              <p className="text-[var(--color-text)] font-medium">
                {enableDragDrop
                  ? 'Drop files here or click to browse'
                  : 'Click to browse'}
              </p>
              {(maxSize || maxFiles || accept) && (
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  {accept && `Accepts: ${accept}`}
                  {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                  {maxFiles && ` • Max files: ${maxFiles}`}
                </p>
              )}
            </div>
          </div>

          {/* Hidden input */}
          <input
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              if (node) {
                (inputRef as React.MutableRefObject<HTMLInputElement>).current =
                  node;
              }
            }}
            id={id}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple={multiple}
            accept={accept}
            {...props}
          />
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="flex items-center gap-3 p-3 border border-[var(--color-border)] rounded-md bg-[var(--color-bg-secondary)]"
              >
                {/* Preview or icon */}
                {showPreviews && fileItem.preview ? (
                  <img
                    src={fileItem.preview}
                    alt={fileItem.file.name}
                    className="h-10 w-10 object-cover rounded flex-shrink-0"
                  />
                ) : (
                  <div className="flex-shrink-0 text-[var(--color-text-muted)]">
                    {getFileIcon(fileItem.file.type)}
                  </div>
                )}

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text)] truncate">
                    {fileItem.file.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    {showFileSize && (
                      <span>{formatFileSize(fileItem.file.size)}</span>
                    )}
                    {showFileType && showFileSize && <span>•</span>}
                    {showFileType && (
                      <span>{fileItem.file.type || 'Unknown'}</span>
                    )}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(fileItem.id)}
                  className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors text-[var(--color-text-muted)] hover:text-red-600"
                  aria-label={`Remove ${fileItem.file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Helper text or error message */}
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

FileInput.displayName = 'FileInput';

export default FileInput;
