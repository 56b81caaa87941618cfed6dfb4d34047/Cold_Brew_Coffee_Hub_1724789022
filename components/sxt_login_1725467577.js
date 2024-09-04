<template>
  <div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-900 via-pink-800 to-black">
    <div class="p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
      <div v-if="!isLoggedIn">
        <button class="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          @click="openModal">Login</button>
      </div>
      <div v-else>
        <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          @click="handleLogout">Logout
        </button>
        <div class="mt-4 text-white font-semibold">{{ getUserInformation().userId }}</div>
      </div>
    </div>
    <dialog ref="loginModal" class="bg-transparent">
      <div class="w-full max-w-md p-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
        <h2 class="text-3xl font-semibold text-center text-white mb-8">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-6">
            <label for="text" class="block text-sm font-medium text-pink-200 mb-2">Username:</label>
            <input type="text" id="email" v-model="username" required
              class="w-full px-4 py-3 text-white bg-purple-800 bg-opacity-50 border border-pink-300 rounded-md focus:border-pink-500 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 placeholder-pink-200::placeholder">
          </div>
          <div class="mb-8">
            <label for="password" class="block text-sm font-medium text-pink-200 mb-2">Password:</label>
            <input type="password" id="password" v-model="password" required
              class="w-full px-4 py-3 text-white bg-purple-800 bg-opacity-50 border border-pink-300 rounded-md focus:border-pink-500 focus:outline-none focus:ring focus:ring-pink-200 focus:ring-opacity-50 placeholder-pink-200::placeholder">
          </div>
          <div class="flex items-center justify-between space-x-4">
            <button @click="closeModal"
              class="w-full px-6 py-3 text-white bg-pink-600 rounded-full hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
              Cancel
            </button>
            <button type="submit"
              class="w-full px-6 py-3 text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
              Login
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false,
      isLoading: false,
      showLogin: false
    };
  },
  beforeMount: function () {
    // check to see if we have user credentials in localStorage
    const credentials = localStorage.getItem('userInformation');
    if (credentials) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    async handleLogin() {
      try {
        console.log('Username:', this.username);
        console.log('Password:', this.password);

        await this.loginUser({
          'userId': this.username,
          'password': this.password
        });
        this.isLoggedIn = true;
        this.closeModal();
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false;
        this.username = '';
        this.password = '';
      }
    },
    handleLogout() {
      try {
        this.logoutUser();
        this.showLogin = false;
        this.isLoggedIn = false;
      } catch (error) {

      } finally {

      }
    },
    getUserInformation() {
      return JSON.parse(localStorage.getItem('userInformation'));
    },
    openModal() {
      this.$refs.loginModal.showModal();
    },
    closeModal() {
      this.$refs.loginModal.close();
    },
    async loginUser(credentials) {
      const tempHardcodedLoginPath = `https://proxy.stage.cosmicmoment.dev/auth/login`
      let response = await fetch(tempHardcodedLoginPath, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(credentials)
      })
      if (!response.ok) {
      throw new Error("failed to login user")
      }
      let responseData = await response.json();
      console.log(responseData);

      // add info to localStorage
      const userInformation = {
      userId: credentials.userId,
      ...responseData
      }

      localStorage.setItem('userInformation', JSON.stringify(userInformation));
    },
    async logoutUser() {
      localStorage.removeItem("userInformation");
    }
  },
};
</script>