import { createStore } from 'vuex'


const store = createStore({
    state: {
            uid: "",
            username: "",
            token: "",
    },
    mutations: {
        setUserID(state, uid) {
            state.uid = uid
        },
        setUsername(state, username) {
            state.username = username
        },
        setToken(state, token) {
            state.token = token
        },
    }
})

export default store
