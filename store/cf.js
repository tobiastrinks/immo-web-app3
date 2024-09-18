import { defineStore } from 'pinia'
import { createClient } from 'contentful'
import {CF_CONTENT_TYPES} from "assets/js/constants.js";

const cfClient = createClient({
    space: 'l85a45bd5kqp',
    accessToken: 'P6OqBX4ptWactmkfViX5opXEgc_VvNtoMQ_U9r4Bo8I' // prod
    // accessToken: 'a0XQuYAz4JXad1lbWKZ8Z9frgJ0Su8nZebMBf12EDFA', // preview
    // basePath: 'https://preview.contentful.com'
})

export const useCfStore = defineStore('cf', {
    state: () => ({
        homeFaq: null
    }),
    actions: {
        async fetchHomeFaq() {
            if (this.homeFaq) {
                return
            }
            const res = await cfClient.getEntries({
                content_type: CF_CONTENT_TYPES.HOME_FAQ
            })
            this.homeFaq = res.items[0].fields
        }
    }
})
