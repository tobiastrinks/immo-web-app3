export default function () {
    const config =  useRuntimeConfig()
    const cachedApiFetch = $fetch.create({
        baseURL: config.public.apiUrlCached
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
