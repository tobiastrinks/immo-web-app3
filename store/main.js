export const useStore = defineStore('main', {
    state: () => ({
        navMinified: false,
        navDimensions: {
            navTopHeight: 0,
            navBottomHeight: 0,
            navLocationHeight: 0
        },
        mobileNavOpened: false,
        toast: null,
        searchRandomAutocomplete: Math.ceil(Math.random() * 100000).toString()
    }),
    getters: {
        maximizedNavHeight ({ navDimensions: { navTopHeight, navBottomHeight, navLocationHeight } }) {
            return navTopHeight + navBottomHeight + navLocationHeight
        },
        navMinifyOffset ({ navMinified, navDimensions: { navBottomHeight } }) {
            if (navMinified) {
                return -navBottomHeight
            } else {
                return 0
            }
        }
    },
    actions: {
        minifyNav() {
            this.navMinified = true
        },
        maximizeNav() {
            this.navMinified = false
        },
        setNavDimensions({ navTopHeight, navBottomHeight, navLocationHeight }) {
            this.navDimensions = { navTopHeight, navBottomHeight, navLocationHeight }
        },
        openMobileNav() {
            this.mobileNavOpened = true
        },
        closeMobileNav() {
            this.mobileNavOpened = false
        },
        setToast(toast) {
            this.toast = toast
        }
    }
})
