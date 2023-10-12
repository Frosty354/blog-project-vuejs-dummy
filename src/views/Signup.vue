<template>
    <div class="auth-container">
        <div class="auth-section">
        <h2>Signup</h2>
        <form @submit.prevent="signup">
            <div class="form-group">
                <label for="signup-name">Name:</label>
                <input type="text" id="signup-name" v-model="signupForm.name" required>
            </div>
            <div class="form-group">
                <label for="signup-email">username:</label>
                <input type="text" id="signup-email" v-model="signupForm.username" required>
            </div>
            <div class="form-group">
                <label for="signup-password">Password:</label>
                <input type="password" id="signup-password" v-model="signupForm.password" required>
            </div>
            <div class="button-container">
                <button type="submit" class="auth-button">Signup</button>
                <router-link to="/login">Login</router-link>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
import router from '../router';


export default {
  data() {
    return {
      
      signupForm: {
        name: '',
        username: '',
        password: '',
      },
      
    };
  },
  methods: {

  async signup(){
    //logic for signup
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.signupForm)
        })
        if(response.ok){
          console.log(response)
          router.push('/login')
        }
    } catch (error) {
      console.log(error)
    }
                
  }
},
};
</script>


<style scoped>
  .button-container {
  display: flex;
  justify-content: space-between; /* Space evenly between the buttons */
}
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-section {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.auth-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
