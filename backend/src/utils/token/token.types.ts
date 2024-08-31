import { User } from '@/utils/types/user';

export type payload = {
  user: User;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
