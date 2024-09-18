export default function () {
    const config =  useRuntimeConfig()
    return $fetch.create({ baseURL: config.public.apiUrl })
}
