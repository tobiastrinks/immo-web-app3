import de from './locale/de.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de',
    messages: {
        de
    },
    warnHtmlMessage: false,
    datetimeFormats: {
        de: {
            short: {
                year: 'numeric', month: '2-digit', day: '2-digit'
            }
        }
    }
}))
