import { ref, Ref, onMounted } from 'vue';

export function useFetchData<T>(url: string, token?: string, initialData: T = {} as T) {
  const data = ref(initialData) as Ref<T>;
  const loading = ref(true);
  const error = ref<Error | null>(null);

  onMounted(async () => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      data.value = await response.json();
    } catch (err) {
      error.value = err as Error;
      console.error(err);
    } finally {
      loading.value = false;
    }
  });

  return { data, loading, error };
}
