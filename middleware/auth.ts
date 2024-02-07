import { useAuthStore } from '../store/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  if (to.name !== 'login' && !authStore.isAuthenticated) {
    return navigateTo('/login');
  }
});
