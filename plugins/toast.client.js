import {useStore} from "~/store/main.js";

export default defineNuxtPlugin(() => {
    const mainStore = useStore()

    let delay

    function resetAfterDelay () {
        delay = window.setTimeout(() => {
            mainStore.setToast(null)
        }, 5000)
    }

    function showToast (text, type) {
        if (delay) {
            clearTimeout(delay)
        }
        mainStore.setToast({ type, text })
        resetAfterDelay()
    }

    return {
        provide: {
            toast: {
                error (text) {
                    showToast(text, 'error')
                },
                success (text) {
                    showToast(text, 'success')
                }
            }
        }
    }
})
