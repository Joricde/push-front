import { createStore } from 'vuex'


const store = createStore({
    state() {
        return{
            uid: "",
            username: "",
            token: "",
            is_login:false
        }
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
