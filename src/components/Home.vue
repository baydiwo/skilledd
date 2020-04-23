<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col col-lg-2"></div>
      <div class="col-md-auto">
        <h1>Github Username</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(searchUser)">
            <validation-provider rules="required|alpha_num" v-slot="{ errors, classes }" :bails="false">
            <div class="input-group mb-3" :class="classes" >
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">@</span>
              </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="baydiwo"
                  aria-label="baydiwo"
                  aria-describedby="basic-addon1"
                  v-model="searchQuery"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="submit">Search</button>
                </div>
            </div>
            <div class="alert alert-warning" role="alert" v-if="errors.length">
              <svg class="bi bi-exclamation-diamond" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/>
                <path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>
              </svg>
              {{ errors[0] }}
            </div>
            </validation-provider>
          </form>
        </ValidationObserver>
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

          <router-link
            :to="'/projects/' + user.login"
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
          </router-link>

        </div>
      </div>
    </div>
  </div>
  <!-- container -->
</template>

<script>
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, alpha_num } from 'vee-validate/dist/rules'
import { SEARCH_USER } from '../api/github'

extend('required', {
  ...required,
  message: 'Please enter github username'
})
extend('alpha_num', {
  // eslint-disable-next-line camelcase
  ...alpha_num,
  message: 'No special characters required'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: 'is-dirty'
  }
})

export default {
  name: 'Home',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      searchQuery: '',
      userData: [],
      loading: false
    }
  },
  mounted () {
    if (localStorage.searchQuery) {
      this.searchQuery = localStorage.searchQuery
    }
    if (localStorage.getItem('userData')) {
      try {
        this.userData = JSON.parse(localStorage.getItem('userData'))
      } catch (e) {
        localStorage.removeItem('userData')
      }
    }
  },
  methods: {
    async searchUser () {
      try {
        this.loading = true
        const response = await SEARCH_USER(this.searchQuery)
        this.userData = response.data.items

        localStorage.searchQuery = this.searchQuery
        const parsed = JSON.stringify(this.userData)
        localStorage.setItem('userData', parsed)

        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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
.avatar img{
    width: 50px;
}
.float-right {
  float:right
}
.float-left {
  float:left
}
.media-body h3 {
  line-height: 46px
}
.is-dirty, .is-invalid {
  border: 1px red solid;
  border-radius: 5px;
}
.is-valid {
  border: 1px green solid;
}
</style>
