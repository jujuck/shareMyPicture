import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  let isAdmin = ref<boolean>(true);

  const setIsAdmin = (value: boolean): void => {
    isAdmin.value = value;
  };

  return { isAdmin, setIsAdmin };
});
