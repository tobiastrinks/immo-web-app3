import * as contentful from 'contentful'

export default defineNuxtPlugin((nuxtApp) => {
    const createClientFunc = contentful.createClient || contentful.default.createClient

    const client = createClientFunc({
        space: 'l85a45bd5kqp',
        accessToken: 'P6OqBX4ptWactmkfViX5opXEgc_VvNtoMQ_U9r4Bo8I'
    });

    return {
        provide: {
            cfClient: client,
        },
    }
})
