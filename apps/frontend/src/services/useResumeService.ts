import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import type { DownloadStats } from './types';

export type ResumeType = 'ai-optimized' | 'traditional';

interface DownloadResumeParams {
  type: ResumeType;
}

/**
 * Hook for downloading resume PDFs
 * Handles the blob download and creates a download link automatically
 * Automatically refetches download stats after successful download
 */
export const useDownloadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type }: DownloadResumeParams) => {
      const response = await apiClient.get(`${ENDPOINTS.RESUME}/download`, {
        params: { type },
        responseType: 'blob',
      });
      return { blob: response.data, type };
    },
    onSuccess: ({ blob, type }) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download =
        type === 'ai-optimized'
          ? 'alan-spurlock-resume-ai-optimized.pdf'
          : 'alan-spurlock-resume-traditional.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Invalidate stats to trigger refetch
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.RESUME_DOWNLOADS, 'stats'],
      });
    },
  });
};

/**
 * Hook for fetching resume download statistics
 * Only fetches on mount and after successful downloads (via invalidation)
 */
export const useResumeDownloadStats = () => {
  return useQuery({
    queryKey: [ENDPOINTS.RESUME_DOWNLOADS, 'stats'],
    queryFn: async () => {
      const response = await apiClient.get<DownloadStats>(
        `${ENDPOINTS.RESUME_DOWNLOADS}/stats`
      );
      return response.data;
    },
  });
};
