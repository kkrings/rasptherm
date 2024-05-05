import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/' });

const getBaseQuery: typeof baseQuery = (args, api, extraOptions) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const modifiedArgs =
    typeof args === 'string'
      ? `${baseUrl}${args}`
      : { ...args, url: `${baseUrl}${args.url}` };

  return baseQuery(modifiedArgs, api, extraOptions);
};

export const baseApi = createApi({
  baseQuery: getBaseQuery,
  endpoints: () => ({}),
});
