import { User } from "./user.types"

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  user: User,
  tokens: {
    access_token: string,
    refresh_token: string
  }
}

export type RoleResponse = {
  name: string,
  access: string[]
}
