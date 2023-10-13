<template>
    <div class="blogs-header">
        <h1>Blogs</h1>
        <div class="top-right">
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
    <div>
      <div class="tab-buttons">
        <button @click="activeTab = 'tab1'" :class="{ active: activeTab === 'tab1' }">All posts</button>
        <button @click="activeTab = 'tab2'" :class="{ active: activeTab === 'tab2' }">My posts</button>
        <button @click="activeTab = 'tab3'" :class="{ active: activeTab === 'tab3' }">Create post</button>
      </div>
  
      <div v-if="activeTab === 'tab1'">
      <h2>View all posts</h2>
      <button @click="loadTab1Content">Load Data</button>
      <div v-if="tab1DataLoaded">
        <!-- Display the data here -->
        <div v-for="post in tab1Data.posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p >{{ post.body }}</p>
          <div class="subInfo">
            <p>Reactions: {{ post.reactions }}</p>
            <p>Tags: {{ post.tags.join(', ') }}</p>
          </div>
        </div>
      </div>
      </div>
  
      <div v-if="activeTab === 'tab2'">
        <h2>View your posts</h2>
        <button @click="loadTab2Content">Load Data</button>
      <div v-if="tab1DataLoaded">
        <!-- Display the data here -->
        <div v-for="post in tab1Data.posts" :key="post.id">
          <h3>{{ post.title }}</h3>
          <p >{{ post.body }}</p>
          <div class="subInfo">
            <p>Reactions: {{ post.reactions }}</p>
            <p>Tags: {{ post.tags.join(', ') }}</p>
          </div>
        </div>
      </div>
      </div>

      <div v-if="activeTab === 'tab3'">
        <h2>Create a post</h2>
        <form @submit.prevent="createPost">
        <div class="form-group">
          <label for="post-title">Title:</label>
          <input type="text" id="post-title" v-model="postTitle" required>
        </div>
        <div class="form-group">
          <label for="post-body">Body:</label>
          <textarea id="post-body" v-model="postBody" required></textarea>
        </div>
        <div class="form-group">
          <label for="post-tags">Tags (comma-separated):</label>
          <input type="text" id="post-tags" v-model="postTags" required>
        </div>
        <button type="submit">Create Post</button>
      </form>
        
        
      </div>
    </div>
  </template>
  
  <script>
  import store from '../store';
  import router from '../router';
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        activeTab: 'tab1',
        tab1Data: null,
        tab1DataLoaded: false,
        postTitle: '',
        postBody: '',
        postTags: '',
      };
    },
    methods: {
    loadTab1Content() {
      // Perform the API call when Tab 1 is clicked
      fetch('https://dummyjson.com/posts')
        .then((res) => res.json())
        .then((data) => {
          this.tab1Data = data;
          this.tab1DataLoaded = true;
        })
        .catch((error) => {
          console.error('Error loading data:', error);
          // Handle the error, e.g., display an error message
        });
    },
    loadTab2Content() {
      // Perform the API call when Tab 1 is clicked
      console.log(store.state.user)
      fetch(`https://dummyjson.com/posts/user/${store.state.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          this.tab1Data = data;
          this.tab1DataLoaded = true;
        })
        .catch((error) => {
          console.error('Error loading data:', error);
          // Handle the error, e.g., display an error message
        });
    },
    async createPost(){
      const title = this.postTitle;
      const body = this.postBody;
      const tags = this.postTags.split(',').map(tag => tag.trim());

      
      console.log('Title:', title);
      console.log('Body:', body);
      console.log('Tags:', tags);
      try {
        // Perform the API call when create post is clicked
        const response = await fetch('https://dummyjson.com/posts/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: this.postTitle,
            body:this.postBody,
            tags:this.tags,
            userId: store.state.user.id,
            /* other post data */
          })
        })

        if(response.ok){
          console.log(response)
        }
      } catch (error) {
        console.log(error)
      }
      
    },
    ...mapActions(['logout']),
    logout(){
      router.push('/login')
      
    }
  },
  };
  </script>
  
  <style scoped>
  .blogs-header{
    display: flex;
    justify-content: space-between;
  }
  .tab-buttons {
    display: flex;
  }

  .logout-button {
  background-color: #f00;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
  
  .tab-buttons button {
    border: 1px solid #ccc;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  .tab-buttons button.active {
    background-color: #007BFF;
    color: #fff;
  }
  .subInfo{
    justify-content: space-around;
    display: flex;
  }
  </style>
  