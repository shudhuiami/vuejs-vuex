<template>
    <div>
        <div class="post_processor_wrapper" :class="{_active: postController.postEditor.on === true}">
            <div class="postProcessor">
                <form class="postProcessor_inner" v-on:submit.prevent="updatePost">

                    <div class="loader_wrapper" :class="{on : dataLoad === false}">
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
                  <div class="title">
                    Edit Form
                  </div>
                    <div v-if="editForm !== null">
                      <div class="form-group">
                        <input v-model="editForm.title" type="text" class="post_title form-control" name="title"
                               placeholder="Post title">
                      </div>
                        <div class="margin-10"></div>
                      <div class="form-group">
                        <textarea v-model="editForm.body" class="post_body form-control" placeholder="Your Post"
                                  name="post_body"></textarea>
                      </div>
                        <div class="margin-10"></div>
                        <div class="margin-10"></div>
                        <div class="form_actions">
                            <a class="action_trigger gray" v-on:click="closeEditForm">Close</a>
                            <button type="submit" class="action_trigger post">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['editForm', 'dataLoad'],
        name: 'app',
        data() {
            return {}
        },
        computed: {
            postController() {
                return this.$store.getters.postController;
            },
        },
        methods: {
            updatePost: function () {
                if (this.editForm.title.length !== 0 && this.editForm.body.length !== 0) {
                    this.$store.dispatch('updatePost', this.editForm);
                    this.$emit('loadLoader', false);
                }
            },
            closeEditForm: function () {
                let params = {
                    status: false,
                    post_id: '',
                    index: ''
                };
                this.$store.commit('toggleEditForm', params)
                let THIS = this;
                setTimeout(function () {
                    THIS.editForm.title = '',
                        THIS.editForm.body = ''
                }, 500)
            }
        },
    }
</script>
<style>
</style>
