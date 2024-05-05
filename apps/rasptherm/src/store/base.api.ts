import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery: ReturnType<typeof fetchBaseQuery> = (
  args,
  api,
  extraOptions
) =>
  fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL })(
    args,
    api,
    extraOptions
  );

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});
