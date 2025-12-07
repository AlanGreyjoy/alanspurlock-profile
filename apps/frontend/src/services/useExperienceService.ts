import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import type { Experience } from './types';

export const useExperiences = () => {
  return useQuery({
    queryKey: [ENDPOINTS.EXPERIENCE],
    queryFn: async () => {
      const response = await apiClient.get<Experience[]>(ENDPOINTS.EXPERIENCE);
      return response.data;
    },
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.EXPERIENCE, id],
    queryFn: async () => {
      const response = await apiClient.get<Experience>(
        `${ENDPOINTS.EXPERIENCE}/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });
};
