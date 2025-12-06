import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileInput, type FileItem } from './FileInput';
import { Upload } from 'lucide-react';

const meta: Meta<typeof FileInput> = {
  component: FileInput,
  title: 'Inputs/FileInput',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    enableDragDrop: {
      control: 'boolean',
    },
    showPreviews: {
      control: 'boolean',
    },
    showFileSize: {
      control: 'boolean',
    },
    showFileType: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    label: 'Upload Files',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Upload Documents',
    helperText: 'Select one or more files to upload',
  },
};

export const SingleFile: Story = {
  args: {
    label: 'Upload Profile Picture',
    helperText: 'Choose a single image file',
    multiple: false,
    accept: 'image/*',
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload Multiple Images',
    helperText: 'You can select multiple images at once',
    multiple: true,
    accept: 'image/*',
  },
};

export const WithSizeLimit: Story = {
  args: {
    label: 'Upload with Size Limit',
    helperText: 'Maximum file size is 5MB',
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  },
};

export const WithFileLimit: Story = {
  args: {
    label: 'Upload up to 3 Files',
    helperText: 'You can upload maximum 3 files',
    maxFiles: 3,
    multiple: true,
  },
};

export const WithFileLimitAndSize: Story = {
  args: {
    label: 'Limited Upload',
    helperText: 'Maximum 2 files, 2MB each',
    maxFiles: 2,
    maxSize: 2 * 1024 * 1024, // 2MB
    multiple: true,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Upload Required',
    error: true,
    errorMessage: 'Please upload at least one file',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small File Input',
    size: 'sm',
    helperText: 'Small variant',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large File Input',
    size: 'lg',
    helperText: 'Large variant',
  },
};

export const WithoutPreviews: Story = {
  args: {
    label: 'Upload Files (No Previews)',
    helperText: 'Image previews disabled',
    showPreviews: false,
    multiple: true,
  },
};

export const WithoutDragDrop: Story = {
  args: {
    label: 'Upload Files (Click Only)',
    helperText: 'Drag and drop is disabled',
    enableDragDrop: false,
    multiple: true,
  },
};

export const ShowFileDetails: Story = {
  args: {
    label: 'Upload with File Details',
    helperText: 'Shows file size and type',
    showFileSize: true,
    showFileType: true,
    multiple: true,
  },
};

export const CustomUploadIcon: Story = {
  args: {
    label: 'Custom Upload Icon',
    helperText: 'Using a custom upload icon',
    uploadIcon: <Upload className="h-12 w-12 text-brand-primary" />,
  },
};

export const DocumentsOnly: Story = {
  args: {
    label: 'Upload Documents',
    helperText: 'Accepts PDF, Word, and text files',
    accept: '.pdf,.doc,.docx,.txt',
    multiple: true,
  },
};

export const ImagesOnly: Story = {
  args: {
    label: 'Upload Images',
    helperText: 'Accepts PNG, JPG, and GIF files',
    accept: 'image/png,image/jpeg,image/gif',
    showPreviews: true,
    multiple: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = useState<FileItem[]>([]);

    return (
      <div className="space-y-4">
        <FileInput
          label="Controlled File Input"
          helperText={`${files.length} file(s) selected`}
          value={files}
          onChange={setFiles}
          multiple
        />
        <div className="text-sm text-[var(--color-text-muted)]">
          <p>Selected files:</p>
          {files.length === 0 ? (
            <p>No files selected</p>
          ) : (
            <ul className="list-disc list-inside">
              {files.map((fileItem) => (
                <li key={fileItem.id}>{fileItem.file.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <FileInput label="Default State" helperText="Normal file input" />
      <FileInput
        label="With Files"
        helperText="File input with selected files"
        value={[
          {
            id: '1',
            file: new File([''], 'document.pdf', { type: 'application/pdf' }),
          },
          {
            id: '2',
            file: new File([''], 'image.jpg', { type: 'image/jpeg' }),
          },
        ]}
        onChange={() => {}}
      />
      <FileInput
        label="Error State"
        error
        errorMessage="File size exceeds limit"
      />
      <FileInput
        label="Disabled State"
        helperText="Cannot upload files"
        disabled
      />
      <FileInput label="Small Size" size="sm" helperText="Small variant" />
      <FileInput label="Large Size" size="lg" helperText="Large variant" />
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const handleUpload = async () => {
      if (files.length === 0) {
        setUploadError('Please select at least one file');
        return;
      }

      setIsUploading(true);
      setUploadError('');

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsUploading(false);
      setFiles([]);
      alert('Files uploaded successfully!');
    };

    return (
      <div className="space-y-4 max-w-2xl">
        <FileInput
          label="Upload Files"
          helperText="Select files to upload (max 5 files, 10MB each)"
          value={files}
          onChange={(newFiles) => {
            setFiles(newFiles);
            setUploadError('');
          }}
          error={!!uploadError}
          errorMessage={uploadError}
          maxFiles={5}
          maxSize={10 * 1024 * 1024}
          showFileSize
          showFileType
          multiple
        />
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={isUploading || files.length === 0}
            className="px-4 py-2 bg-brand-primary text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/90 transition-colors"
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
          <button
            onClick={() => {
              setFiles([]);
              setUploadError('');
            }}
            disabled={files.length === 0}
            className="px-4 py-2 border border-brand-primary text-brand-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-primary/5 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    );
  },
};
