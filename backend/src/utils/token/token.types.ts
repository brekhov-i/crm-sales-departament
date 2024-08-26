import { User } from "@/modules/user/user.types"

export type payload = {
  user: User
}

export type Tokens = {
  access_token: string
  refresh_token: string
}
