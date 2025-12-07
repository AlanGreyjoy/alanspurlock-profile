import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';
import type { Skill } from './types';

export const useSkills = () => {
  return useQuery({
    queryKey: [ENDPOINTS.SKILLS],
    queryFn: async () => {
      const response = await apiClient.get<Skill[]>(ENDPOINTS.SKILLS);
      return response.data;
    },
  });
};

export const useSkill = (id: string) => {
  return useQuery({
    queryKey: [ENDPOINTS.SKILLS, id],
    queryFn: async () => {
      const response = await apiClient.get<Skill>(`${ENDPOINTS.SKILLS}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
