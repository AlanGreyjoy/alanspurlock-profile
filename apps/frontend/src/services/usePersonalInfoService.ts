import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import type { PersonalInfo } from './types';

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: [ENDPOINTS.PERSONAL_INFO],
    queryFn: async () => {
      const response = await apiClient.get<PersonalInfo>(
        ENDPOINTS.PERSONAL_INFO
      );
      return response.data;
    },
  });
};
