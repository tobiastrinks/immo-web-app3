export default defineEventHandler((event) => {
    const req = event.node.req
    const res = event.node.res

    const startTs = Date.now()

    res.on('close', () => {
        const endTs = Date.now()
        const duration = endTs - startTs
        const { statusCode } = res
        const { method, url } = req

        const log = {
            context: 'ACCESS_LOG',
            duration,
            statusCode,
            method,
            url
        }
        const logJSON = JSON.stringify(log)

        if (statusCode < 400) {
            if (url.startsWith('/deutschland')) {
                console.log(logJSON)
            }
        } else if (statusCode < 500) {
            console.warn(logJSON)
        } else {
            console.error(logJSON)
        }
    })
})
