import { Ref } from 'vue';
import { UseFetchOptions } from '#app';
import { useAuthStore } from '../store/auth';

type $fetchParams = Parameters<typeof $fetch>;

function useApi() {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();
  return {
    apiUseFetch(
      url: string | Request | Ref<string | Request> | (() => string | Request),
      options?: UseFetchOptions<any>
    ) {
      const params: UseFetchOptions<any> = { baseURL: runtimeConfig.public.apiBase, ...options };
      return useFetch(url, params);
    },
    apiFetch(url: $fetchParams[0], options?: $fetchParams[1]) {
      const headers = { Accept: 'application/json', Authorization: '' };
      if (authStore.isAuthenticated) {
        headers.Authorization = `Bearer ${authStore.accessToken}`;
      }
      const params: $fetchParams[1] = {
        baseURL: runtimeConfig.public.apiBase,
        headers,
        ...options,
        async onRequest() {
          if (authStore.isExpired) {
            await authStore.refresh();
          }
        },
      };
      return $fetch(url, params);
    },
    get(url: string, options?: $fetchParams[1]) {
      const params: $fetchParams[1] = { ...options, method: 'GET' };
      return this.apiFetch(url, params);
    },
    getAsync(url: string, options?: UseFetchOptions<any>) {
      const params: UseFetchOptions<any> = { ...options, method: 'GET' };
      return this.apiUseFetch(url, params);
    },
    post(url: string, options?: $fetchParams[1]) {
      const params: $fetchParams[1] = { ...options, method: 'POST' };
      return this.apiFetch(url, params);
    },
    patch(url: string, options?: $fetchParams[1]) {
      const params: $fetchParams[1] = { ...options, method: 'PATCH' };
      return this.apiFetch(url, params);
    },
    put(url: string, options?: $fetchParams[1]) {
      const params: $fetchParams[1] = { ...options, method: 'PUT' };
      return this.apiFetch(url, params);
    },
    delete(url: string, options?: $fetchParams[1]) {
      const params: $fetchParams[1] = { ...options, method: 'DELETE' };
      return this.apiFetch(url, params);
    },
  };
}

export default useApi;
