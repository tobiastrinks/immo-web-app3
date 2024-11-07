export default function () {
    const config =  useRuntimeConfig()
    const nuxtApp = useNuxtApp()

    let baseURL
    if (nuxtApp.ssrContext) {
        baseURL = config.public.apiUrlCachedSSR || config.public.apiUrlCached
    } else {
        baseURL = config.public.apiUrlCached
    }

    const cachedApiFetch = $fetch.create({
        baseURL
    })
    return {
        async request(url, location, body) {
            return await cachedApiFetch(url, {
                method: 'POST',
                body: {
                    location,
                    body
                }
            })
        }
    }
}
