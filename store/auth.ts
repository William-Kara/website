import { defineStore } from 'pinia';

type ResponseAuth = {
  accessToken: string | null;
  refreshToken: string | null;
  expiredAt: string | null;
};

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const expiredAt = ref<string | null>(null);
  const api = useApi();

  async function login(email: string, password: string) {
    const response = (await api.post('/auth/login', {
      body: {
        email,
        password,
      },
    })) as ResponseAuth;

    if (response) {
      accessToken.value = response.accessToken || '';
      refreshToken.value = response.refreshToken || '';
      expiredAt.value = response.expiredAt || '';
    }
  }

  async function refresh() {
    const response = (await api.post('/auth/refresh', {
      headers: {
        Accept: 'application/json',
      },
      body: {
        refresh_token: refreshToken.value,
      },
    })) as ResponseAuth;

    if (response) {
      accessToken.value = response.accessToken;
      expiredAt.value = response.expiredAt;
    }
  }

  async function logout() {
    await api.post('/auth/logout');
    accessToken.value = null;
    refreshToken.value = null;
    expiredAt.value = null;
  }

  const isAuthenticated = computed(() => !!refreshToken.value);

  const isExpired = computed(() =>
    isAuthenticated && expiredAt.value ? new Date(Date.parse(expiredAt.value)) < new Date() : false
  );

  return {
    accessToken,
    refreshToken,
    expiredAt,
    login,
    logout,
    refresh,
    isAuthenticated,
    isExpired,
  };
});
