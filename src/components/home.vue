<template>
  <div>
    <div class="top_bar_wrapper">
      <div class="container">
        <div class="logo">
          VueJs VueX
        </div>
        <div class="search_box float-end">
          <form v-on:submit.prevent="search_post">
            <div class="form-group " style="position: relative">
              <input v-on:keyup="search_post" v-model="searchKey" type="text" name="search_input"
                     class="search_input form-control" placeholder="Search post">
              <button type="submit" class="search_trigger btn"><i class="las la-search "></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="post_list_wrapper">
      <div class="container">
        <div class="post_list" v-if="post_list.length !== 0">
          <div class="row">
            <div class="col-md-3">
              <div class="eachPost  create-post-wrap animated slideInUp" v-on:click="openPostForm">
                <div class="create-post">
                  <a href="javascript:void(0)">
                    <i class="las la-plus"></i>
                    <span>Create Post</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-md-3" v-for="(post,index) in post_list">
              <div class="eachPost  animated slideInUp">
                <div class="dropBox">
                  <div class="dropBox_inner">
                    <div class="icon_trigger btn btn-primary btn-sm">
                      <i class="las la-cog"></i>
                    </div>
                    <div class="dropMenu">
                      <div class="drop_child" v-on:click="openEditor(post.id , index)"><i class="las la-edit"></i> Edit
                        Post
                      </div>
                      <div class="drop_child" v-on:click="callRemover(post.id , index)"><i class="las la-trash"></i>
                        Remove Post
                      </div>
                    </div>
                  </div>
                </div>
                <div class="image-box border ">
                  <img src="https://www.wpbeginner.com/wp-content/uploads/2018/07/whatisblog.png" alt="">
                </div>
                <div class="wrapper">
                  <div class="post_title">
                    <router-link :to="'/posts/'+post.id">{{ post.title }}</router-link>
                  </div>
                  <div class="margin-10"></div>
                  <div class="post_content">{{ post.body }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="post_list" v-if="post_list.length === 0">
          <div class="margin-10"></div>
          <div class="margin-10"></div>
          <div class="margin-10"></div>
          <div class="margin-10"></div>
          <div class="margin-10"></div>
          <div class="margin-10"></div>
          <div class="ground_loader_wrapper">
            <div class="bg-bar"></div>
            <div class="bg-bar"></div>
            <div class="sm-bar"></div>
            <div class="bg-bar"></div>
            <div class="alert_msg">Empty</div>
            <div class="bg-bar"></div>
            <div class="sm-bar"></div>
            <div class="bg-bar"></div>
            <div class="bg-bar"></div>
          </div>
        </div>
      </div>
    </div>


    <create_form></create_form>

    <edit_form :editForm="editForm" :dataLoad="dataLoad"  v-on:loadLoader="loadLoader"></edit_form>

    <div class="delete_confirm_wrapper" :class="{_active: postController.removePost.on === true}">
      <div class="delete_confirm">
        <div class="delete_confirm_inner">
          <div class="loader_wrapper" :class="{on: postController.removePost.loader === true}">
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
          <div class="help_slogan-icon"><i class="las la-question-circle"></i></div>
          <div class="help_slogan">Selected Post will be remove</div>
          <div class="margin-10"></div>
          <div class="margin-10"></div>
          <div class="action_section ">
            <a class="action_trigger " v-on:click="closeRemover">close</a>
            <a class="action_trigger danger" v-on:click="delete_post()"><i class="las la-trash"></i> Remove</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import create_form from './create.vue';
import edit_form from './edit.vue';

export default {
  name: 'app',
  data() {
    return {
      post_type: 1,
      searchKey: '',
      editForm: {
        title: '',
        body: ''
      },
      dataLoad: true,
      deletePostInfo: {
        post_id: '',
        index: '',
      }
    }
  },
  created() {
    this.getPostList()
  },
  computed: {
    postController: {
      get: function () {
        return this.$store.getters.postController;
      }
    },
    post_list: {
      get: function () {
        return this.$store.getters.post_list;
      }
    },
  },
  components: {create_form, edit_form},
  methods: {
    isEven: function (index) {
      if (index % 2 == 0) {
        return true;
      } else {
        return false;
      }
    },
    search_post: function (event) {
      this.post_type = 2;
      if (this.searchKey.length > 0) {
        this.axios.get('https://jsonplaceholder.typicode.com/posts?title_like=' + this.searchKey).then((response) => {
          this.$store.commit('post_list', response.data)
        })
      } else {
        this.getPostList()
      }
    },
    getPostList: function () {
      this.$store.dispatch('getPostList');
    },
    delete_post: function () {
      this.postController.removePost.loader = true;
      let params = {
        post_id: this.deletePostInfo.post_id,
        index: this.deletePostInfo.index,
      };
      console.log(params)
      this.$store.dispatch('removePost', params);
    },
    callRemover: function (post_id, index) {
      this.deletePostInfo.post_id = post_id;
      this.deletePostInfo.index = index;
      this.postController.removePost.on = true;
    },
    openPostForm: function () {
      this.$store.commit('toggleCreateForm', true)
    },
    openEditor: function (post_id, index) {
      this.editForm.title = this.post_list[index].title;
      this.editForm.body = this.post_list[index].body;
      let params = {
        post_id: post_id,
        index: index,
        status: true
      };
      this.$store.commit('toggleEditForm', params)
      let THIS = this;
      setTimeout(function () {
        THIS.dataLoad = true;
      }, 500);
    },
    closeRemover: function () {
      this.deletePostInfo.post_id = '';
      this.deletePostInfo.index = '';
      this.postController.removePost.on = false;
    },
    loadLoader: function (value) {
      this.dataLoad = value;
    }
    /*updateForm: function (event) {
        let trigger = event.currentTarget;
        let targer = trigger.parentElement.querySelector('.drop_box');
        if (targer.classList.contains('active')){
            targer.classList.remove('active')
        }else {
            const fullname = this.user.fullname;
            const email = this.user.email;
            this.userUpdate.fullname = fullname;
            this.userUpdate.email = email;
            targer.classList.add('active')
        }
    },
    updateUser: function (event) {
        this.$store.dispatch('setUser', this.userUpdate);
        let trigger = event.currentTarget;
        let dropBox = trigger.parentElement.parentElement;
        dropBox.classList.remove('active');
        this.userUpdate.fullname = '';
        this.userUpdate.email = '';
    }*/
  }
}
</script>
<style>
</style>
