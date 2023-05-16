import axios from 'axios'



const login = async (userData) => {
    const response = await axios.post('https://sigviewauth.sigmoid.io/signIn', userData)
  
    if (response.data) {
      localStorage.setItem('token', JSON.stringify(response.data.token))
    }
    return response.data
  }



const signinService = {
    login
  }
  
  export default signinService