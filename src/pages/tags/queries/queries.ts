import { getTagPaging, postTag } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetTags = (page: number, size: number) => {
  return useQuery({
    queryKey: ['tags', page, size],
    queryFn: async () => getTagPaging(page, size)
  });
};

export const useMutTag = () => {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => postTag(name),
    mutationKey: ['tags']
  });
};
