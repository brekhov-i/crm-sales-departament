export type LoginBody = {
  email: string;
  password: string;
};

export type RegistrationBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type RoleBody = {
  name: string;
  title: string;
  access: string[];
};
