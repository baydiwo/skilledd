import axios from 'axios'

export const __apiGet = (URL, param) => axios({
  url: URL,
  method: 'get',
  params: {
    q: param
  }

})
