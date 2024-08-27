import { defineStore } from "pinia";
import { $API } from "@/shared/api";
import type { User } from "@/shared/types/user.types";
import type { LoginBody, LoginResponse, RoleResponse } from '@/shared/types/auth.types'

type State = {
  user: null | User,
  accessList: string[]
}

export const useAuthStore = defineStore('authStore', {
  state: ():State => ({
    user: null,
    accessList: []
  }),
  actions: {
    async login(body: LoginBody) {
      await $API.post<LoginResponse>('/auth/login', body).then(res => {
        localStorage.setItem('token', res.data.tokens.access_token);
        this.user = res.data.user;
        this.accessList = []
      })
    },
    async getRoleAccess(role: string) {
      await $API.get<RoleResponse>(`/user/role/${role}`).then(res => {
        this.accessList = res.data.access
      })
    }
  },
  getters: {
    getAccess: (state: State) => (access: string | string[]) => {
      if(Array.isArray(access)) {
        return access.some(el => state.accessList.some(str => str.includes(el)))
      } else {
        return state.accessList.some(str => str.includes(access))
      }
    }
  }

})
