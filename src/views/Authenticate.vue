<template>
  <div class="auth-container">
    <div class="auth-section">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login-username">username:</label>
          <input type="text" id="login-username" v-model="loginForm.username" required>
        </div>
        <div class="form-group">
          <label for="login-password">Password:</label>
          <input type="password" id="login-password" v-model="loginForm.password" required>
        </div>
        
        <div class="button-container">
          <button type="submit" class="auth-button">Login</button>
          <router-link to="/signup">Signup</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>

  import router from '../router';
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        
        
      };
    },
    methods: {
    ...mapActions(['login']), // Map the login action
    async handleLogin() {
      const loginData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      };

      const success = await this.login(loginData);

      if (success) {
        // User is authenticated, navigate to the '/blogs' route
        
        router.push('/blogs');
      } else {
        alert('Wrong Password')
      }
    },
    
  },
  };
  </script>
  
  <style scoped>
  .button-container {
  display: flex;
  justify-content: space-between; 
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
  