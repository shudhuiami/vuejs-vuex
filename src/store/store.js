import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
    state: {
        user: '',
        post_list: [],
        postController: {
            postProcessor: {
                on: false,
                loader: false,
            },
            postEditor: {
                on: false,
                post_id: '',
                index: '',
            },
            removePost: {
                on: false,
                loader: false
            }
        },
    },
    getters: {
        post_list(state) {
            return state.post_list;
        },
        postController(state) {
            return state.postController;
        }

    },
    mutations: {
        toggleCreateForm(state, option) {
            state.postController.postProcessor.on = option;
        },
        toggleEditForm(state, option) {
            state.postController.postEditor.post_id = option.post_id;
            state.postController.postEditor.index = option.index;
            state.postController.postEditor.on = option.status;
        },
        post_list(state, postCollection) {
            state.post_list = postCollection;
        },
        removePost(state, index) {
            state.post_list.splice(index, 1);
            state.postController.removePost.on = false;
            state.postController.removePost.loader = false;

        },
        insertPost(state, postData) {
            state.post_list.splice(0, 0, postData)
            state.postController.postProcessor.on = false;
            state.postController.postProcessor.loader = false;
        },
        updatePost(state, postData) {
            state.post_list.splice(state.postController.postEditor.index, 1, postData)
            state.postController.postEditor.on = false;
        },
    },
    actions: {
        getPostList(context) {
            axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
                if (response.status === 200) {
                    context.commit('post_list', response.data)
                }
            })
        },
        insertPost(context, post_info) {
            context.state.postController.postProcessor.loader = true;
            axios.post('https://jsonplaceholder.typicode.com/posts', post_info).then((response) => {
                if (response.status === 201) {
                    context.commit('insertPost', response.data)
                }
            })
        },
        updatePost(context, post_info) {
            axios.put('https://jsonplaceholder.typicode.com/posts/' + context.state.postController.postEditor.post_id, post_info).then((response) => {
                if (response.status === 200) {
                    console.log(context.state.postController.postEditor.index)
                    context.commit('updatePost', response.data);
                }else {
                    context.state.postController.postEditor.on = false;
                }
            })
        },
        removePost(context, post_info) {
            axios.delete('https://jsonplaceholder.typicode.com/posts/' + post_info.post_id).then((response) => {
                if (response.status === 200) {
                    context.commit('removePost', post_info.index)
                }
            })
        },
    }
});
