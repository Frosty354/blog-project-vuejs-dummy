import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
        id: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        image: '',
        token: ''

    }, // Initialize according to data from dummy json
    isAuthenticated: false, // a parameter to check globally if the user is authenticated
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;  // updated on login
      state.isAuthenticated = true;
    },
  },
  actions: {
    async login({ commit }, loginData) {
      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (response.ok) {
          const userData = await response.json();
          
          commit('setUser', userData); // Commit the mutation to set user data
        }

        return response.ok; // Return true for a successful login, false otherwise
      } catch (error) {
        console.error('Error during login:', error);
        return false;
      }
    },
  },
  
});

export default store;
