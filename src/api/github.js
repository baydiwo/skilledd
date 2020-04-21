import { __apiGet } from '../utils/api'

export const SEARCH_USER = params =>
  __apiGet('https://api.github.com/search/users?', params)
export const GET_USER_PROJECTS = params =>
  __apiGet('https://api.github.com/users/' + params + '/projects')

export default {
  SEARCH_USER,
  GET_USER_PROJECTS
}
