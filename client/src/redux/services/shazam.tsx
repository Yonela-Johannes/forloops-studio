import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../../constants/base_urls";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers) => {
            return headers
        },
    }),
    endpoints: (builder) => ({
        getSongsByCountry: builder.query({ query: () => `top_country_tracks/?country_code=ZA&limit=50&start_from=1`}),
        getSongsSearch: builder.query({ query: (text) => `search_track/?query=${text}&limit=20&start_from=1`}),
        getSongDetails: builder.query({ query: ({songid}) => `track_about/?track_id=${songid}`}),
    })
})

export const {
    useGetSongsByCountryQuery,
    useGetSongsSearchQuery,
    useGetSongDetailsQuery,
} = shazamCoreApi;
