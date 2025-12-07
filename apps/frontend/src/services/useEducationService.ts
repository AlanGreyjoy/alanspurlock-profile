import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import type { Education } from './types';

export const useEducation = () => {
  return useQuery({
    queryKey: [ENDPOINTS.EDUCATION],
    queryFn: async () => {
      const response = await apiClient.get<Education[]>(ENDPOINTS.EDUCATION);
      return response.data;
    },
  });
};

export const useEducationById = (id: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.EDUCATION, id],
    queryFn: async () => {
      const response = await apiClient.get<Education>(
        `${ENDPOINTS.EDUCATION}/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });
};
