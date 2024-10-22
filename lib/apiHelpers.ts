import { FILTERS } from "@/app/lib/constants";

/** Returns a URL that can be used to call the API route "api/explore" for filtered data. */
export function buildFiltersApiRequestURL(baseUrl: string, filters: FILTERS) {
    const apiRequestURL = new URL(baseUrl);
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value as string);
        }
    }

    apiRequestURL.search = searchParams.toString();

    return apiRequestURL;
}