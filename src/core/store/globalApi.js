import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const globalApi = createApi({
  reducerPath: 'globalApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),

  endpoints: (builder) => ({
    getApiCall: builder.query({
      query: (url) => `${url}`,
    }),

    postApiCall: builder.mutation({
      query: ({ url, data }) => ({
        url: `${url}`,
        method: 'POST',
        body: data,
      }),
    }),

    paramsApiCall: builder.mutation({
      query: ({ url, data, body={} }) => {
        const dataKeys = Object.keys(data);
        let mainUrl = url;

        dataKeys.forEach((key, index) => {
          mainUrl += (index === 0 && !url.includes('?') ? '?' : '&') + key + '=' + encodeURIComponent(data[key]);
        });

        return {
          url: mainUrl,
          method: 'POST',
          body: body,
        };
      },
    }),

    deleteApiCall: builder.mutation({
      query: ({ url, data }) => {
        const dataKeys = Object.keys(data);
        let mainUrl = url;

        dataKeys.forEach((key, index) => {
          mainUrl += (index === 0 && !url.includes('?') ? '?' : '&') + key + '=' + encodeURIComponent(data[key]);
        });

        return {
          url: mainUrl,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetApiCallQuery,
  usePostApiCallMutation,
  useParamsApiCallMutation,
  useDeleteApiCallMutation
} = globalApi;
