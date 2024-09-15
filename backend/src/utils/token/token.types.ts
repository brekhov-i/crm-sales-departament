import { UserPayload } from '@/modules/user/dtos/user.dto';

export type payload = {
  user: UserPayload;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
