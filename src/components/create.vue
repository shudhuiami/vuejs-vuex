<template>
    <div>
        <div class="post_processor_wrapper" :class="{_active: postController.postProcessor.on === true}">
            <div class="postProcessor">
                <form class="postProcessor_inner" v-on:submit.prevent="submitPost">
                  <div class="title">
                    Create Form
                  </div>
                    <div class="loader_wrapper" :class="{on : postController.postProcessor.loader === true}">
                        <div class="loader_inner">
                            <div class="sk-cube-grid">
                                <div class="sk-cube sk-cube1"></div>
                                <div class="sk-cube sk-cube2"></div>
                                <div class="sk-cube sk-cube3"></div>
                                <div class="sk-cube sk-cube4"></div>
                                <div class="sk-cube sk-cube5"></div>
                                <div class="sk-cube sk-cube6"></div>
                                <div class="sk-cube sk-cube7"></div>
                                <div class="sk-cube sk-cube8"></div>
                                <div class="sk-cube sk-cube9"></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="postController.postProcessor.on === true">
                      <div class="form-group">
                        <input v-model="postForm.title" type="text" class="post_title form-control" name="title"
                               placeholder="Post title">
                      </div>
                        <div class="margin-10"></div>
                      <div class="form-group">
                        <textarea v-model="postForm.body" class="post_body form-control" placeholder="Your Post"
                                  name="post_body"></textarea>
                      </div>
                        <div class="margin-10"></div>
                        <div class="margin-10"></div>
                        <div class="form_actions">
                            <a class="action_trigger gray" v-on:click="closePostForm">Close</a>
                            <button type="submit" class="action_trigger post">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                postForm: {
                    title: '',
                    body: '',
                    userId: 1
                }
            }
        },
        computed: {
            postController() {
                return this.$store.getters.postController;
            },
        },
        methods: {
            submitPost: function (event) {
                let dataPack = this.postForm;
                if (this.postForm.title.length !== 0 && this.postForm.body.length !== 0) {
                    this.$store.dispatch('insertPost', dataPack);
                    let THIS = this;
                    setTimeout(function () {
                        THIS.postForm.title = '',
                            THIS.postForm.body = ''
                    }, 500)
                }
            },
            closePostForm: function () {
                this.$store.commit('toggleCreateForm', false)
            }
        }
    }
</script>
<style>
</style>
