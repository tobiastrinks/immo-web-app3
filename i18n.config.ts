import de from './locale/de.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'de',
    messages: {
        de
    },
    warnHtmlMessage: false
}))
