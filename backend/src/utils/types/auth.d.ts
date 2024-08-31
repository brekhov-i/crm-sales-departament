import { User } from '@/utils/types/user';

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

export type RegisterBody = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  role: number;
};

export type RegisterResponse = {
  statusCode: number;
  message: string;
};
