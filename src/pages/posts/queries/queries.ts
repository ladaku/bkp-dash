import { PostPayload } from '@/constants/data';
import { getPostPaging, createPost, getTagSelect, deletePost } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetPosts = (page: number, size: number) => {
  return useQuery({
    queryKey: ['posts', page, size],
    queryFn: async () => getPostPaging(page, size)
  });
};

export const useMutPost = () => {
  return useMutation({
    mutationFn: async (data: FormData) => createPost(data),
    mutationKey: ['posts']
  });
};

export const useDelPost = () => {
  return useMutation({
    mutationFn: async (id: number) => deletePost(id),
    mutationKey: ['posts']
  });
};

export const useGetTagsSelect = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => getTagSelect()
  });
};
