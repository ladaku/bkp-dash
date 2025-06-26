import { postLogin } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password
    }: {
      username: string;
      password: string;
    }) => postLogin(username, password),
    mutationKey: ['auth']
  });
};
