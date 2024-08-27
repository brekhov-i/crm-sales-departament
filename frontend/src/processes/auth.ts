import { useAuthStore } from "@/shared/store/AuthStore";
import { storeToRefs } from "pinia";
import { NavigationGuardWithThis } from "vue-router";

export const auth: NavigationGuardWithThis<undefined> = (to) => {
  if (to.meta.auth === false) return;

  const { getAccess } = storeToRefs(useAuthStore())
  const token = localStorage.getItem('token');

  if (!token) {
    return { name: "Login" }
  }

  if(to.meta.access && !getAccess.value(to.meta.access)) {
    return { name: "403" }
  }

  return;
}
