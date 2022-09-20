import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        errors: [],
        menuBarVisible: false,
    },
    mutations: {
        addError(state, payload) {
            state.errors.push(payload);
        },
        clearErrors(state) {
            state.errors = [];
        },
        changeMenuBarVisibility(state) {
            state.menuBarVisible = !state.menuBarVisible;
        }
    },
    getters: {
        errorsPresent(state) {return state.errors.length > 0}
    }
})

export default store;