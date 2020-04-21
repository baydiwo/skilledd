import { __apiGet } from '../utils/api'

export const SEARCH_USER = params => __apiGet('https://api.github.com/search/users?', params)

export default {
  SEARCH_USER
}
