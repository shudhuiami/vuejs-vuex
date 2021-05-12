<template>
    <div>
        <div class="top_bar_wrapper">
            <div class="top_bar">
                <div class="location_view" v-if="post_data !== null">
                  <nav style="--bs-breadcrumb-divider: '/';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"> <router-link class="link" :to="'/vuejs-vuex'">HOME</router-link></li>
                      <li class="breadcrumb-item active" aria-current="page"><span> {{post_data.title}}</span></li>
                    </ol>
                  </nav>
                </div>

            </div>
        </div>
        <div class="margin-10"></div>
        <div class="post_wrapper" v-if="post_data !== null">
            <div class="container">
              <div class="image-box">
                <img src="https://liveandlearncentre.ca/wp-content/uploads/2016/09/f7148507-7860-465b-950b-2f55b420cedb-1229-0000010877ffe7ca_tmp.jpg" alt="">
              </div>
                <div class="post_title">{{post_data.title}}</div>
                <div class="margin-10"></div>
                <div class="margin-10"></div>
                <div class="margin-10"></div>
                <div class="post_content">{{post_data.body}}</div>
                <div class="margin-10"></div>
                <div class="margin-10"></div>
                <div class="margin-10"></div>
                <hr>
                <div class="comments_wrapper">
                    <div class="comments_inner" v-if="post_comments !== null">
                        <div class="each_comment" v-for="comment in post_comments">
                            <span class="username">{{comment.name}}<span> </span></span>
                            <span class="comment_body">{{comment.body}}</span>
                        </div>
                    </div>
                </div>
                <div class="margin-10"></div>
                <div class="margin-10"></div>
                <div class="commentor_wrapper">
                    <div class="comment_input">
                        <form v-on:submit.prevent="commentProcessor">
                          <div class="form-group">
                            <textarea v-model="commentContent.comment" type="text" name="comment_editor"
                                      class="comment_editor form-control" placeholder="Your comment"></textarea>
                            <div class="form-group text-right">
                            <button class="btn post">Post</button>
                            </div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="post_wrapper" v-if="post_data === null">
            <div class="post_inner ts">
                <div class="loader_wrapper ts on">
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
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                post_data: null,
                post_comments: null,
                commentContent: {
                    comment: ''
                }
            }
        },
        created() {
            if (!isNaN(this.$route.params.id)) {
                if (parseInt(this.$route.params.id) < 101) {
                    this.axios.get('https://jsonplaceholder.typicode.com/posts/' + this.$route.params.id).then((response) => {
                        this.post_data = response.data;
                    });
                    this.axios.get('https://jsonplaceholder.typicode.com/comments?postId=' + this.$route.params.id).then((response) => {
                        this.post_comments = response.data;
                    });
                } else {
                    this.$router.push('/')
                }
            } else {
                this.$router.push('/')
            }
        },
        methods: {
            commentProcessor: function (event) {
                const data = this.commentContent.comment;
                let comment = {
                    name: "Ahmed zobayer",
                    email: "Zobayer",
                    body: data
                };
                if (this.commentContent.comment.length > 0) {
                    this.commentContent.comment = '';
                    this.axios.post('https://jsonplaceholder.typicode.com/comments?postId=' + this.$route.params.id, comment).then((response) => {
                        this.post_comments.push(response.data)
                    });
                }
            }
        }
    }
</script>
<style>
</style>
