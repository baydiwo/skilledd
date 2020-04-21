<style>
.avatar img{
    width: 50px;
}
.float-right {
  float:right
}
.float-left {
  float:left
}
</style>

<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col col-lg-2"></div>
      <div class="col-md-auto">
        <h1>My Username {{this.$router.param}}</h1>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">@</span>
          </div>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model="searchQuery"
            v-on:keyup.enter="searchUser"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchUser">Search</button>
          </div>
        </div>
      </div>
      <div class="col col-lg-2"></div>
    </div>
    <!-- row -->

    <div class="row">
      <div class="col align-self-center">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-if="loading">
            <div class="spinner-border" role="status" >
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="(user, userIndex) in userData"
            :key="userIndex"
          >
            <div class="float-left avatar">
              <img :src="user.avatar_url" class="align-self-start mr-3" :alt="user.login" />
            </div>
            <div class="media-body float-left">
              <h3 class="mt-0 mb-1">{{ user.login }}</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- container -->
</template>

<script>
import { SEARCH_USER } from '../api/github'

export default {
  name: 'HelloWorld',
  data () {
    return {
      searchQuery: '',
      userData: [],
      loading: false
    }
  },
  mounted () {
    // this.searchUser()
    console.log(this.$route.params.user)
  },
  methods: {
    async searchUser () {
      console.log('test')
      try {
        this.loading = true
        const response = await SEARCH_USER(this.searchQuery)
        console.log(response.data.items)
        this.userData = response.data.items
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
