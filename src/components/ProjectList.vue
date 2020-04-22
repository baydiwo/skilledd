<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col col-lg-2"></div>
      <div class="col-md-auto">
        <h1>@{{this.$route.params.user}} Projects</h1>
      </div>
      <div class="col col-lg-2"></div>
    </div>
    <!-- row -->

    <div class="row">
      <div class="col col-12">

        <div class="list-group-item list-group-item-action" v-if="loading">
          <div class="spinner-border" role="status" >
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div v-if="!projectData.length">
          <h4>No Project</h4>
        </div>

        <div class="accordion" id="projectAccordion">
          <div class="card" v-for="(project, projectIndex) in projectData"
            :key="projectIndex">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#collapse'+projectIndex" aria-expanded="true" :aria-controls="'collapse'+projectIndex">
                  {{project.name}}
                </button>
              </h2>
            </div>

            <div :id="'collapse'+projectIndex" class="collapse" aria-labelledby="headingOne" data-parent="#projectAccordion">
              <div class="card-body" v-html="project.body">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col align-self-center">
        <div class="back-link">
          <router-link to="/">
          <svg class="bi bi-chevron-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>
          </svg>
          back to home</router-link>
        </div>
      </div >
    </div>
  </div>
  <!-- container -->
</template>

<script>
import { GET_USER_PROJECTS } from '../api/github'

export default {
  name: 'ProjectList',
  data () {
    return {
      projectData: [],
      loading: false
    }
  },
  mounted () {
    this.getProjects()
  },
  methods: {
    async getProjects () {
      try {
        this.loading = true
        const response = await GET_USER_PROJECTS(this.$route.params.user)
        this.projectData = response.data
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.accordion, .back-link {
  margin-top: 20px;
}
</style>
