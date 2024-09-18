import { v4 as uuidv4 } from 'uuid';

export default function () {
    const clientIdCookie = useCookie('clientId')
    if (!clientIdCookie.value) {
        clientIdCookie.value = uuidv4()
    }
    const clientId = clientIdCookie.value

    const config =  useRuntimeConfig()
    const calcFetch = $fetch.create({
        baseURL: config.public.apiUrlPlatform
    })

    return {
        async getAll () {
            return await calcFetch('/propertyCalculations', {
                method: 'GET',
                params: { clientId }
            })
        },
        async submitTransient (data) {
            return await calcFetch('/propertyCalculations/transient', {
                method: 'POST',
                body: data,
                params: { clientId }
            })
        },
        async saveNew (data, label) {
            return await calcFetch('/propertyCalculations', {
                method: 'POST',
                body: data,
                params: { label, clientId }
            })
        },
        async overwriteSaved (id, data, label) {
            return await calcFetch(`/propertyCalculations/${id}`, {
                method: 'PUT',
                body: data,
                params: { label, clientId }
            })
        },
        async deleteOne (id) {
            return await calcFetch(`/propertyCalculations/${id}`, {
                method: 'DELETE',
                params: { clientId }
            })
        },
        async getFieldNotes () {
            return await calcFetch('/fieldNotes', {
                method: 'GET'
            })
        }
    }
}
