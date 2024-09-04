<template>
  <div class="flex items-center justify-center w-full h-full">
    <div>
      <div v-if="!isLoggedIn">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="openModal">Login</button>
      </div>
      <div v-else>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="handleLogout">Logout
        </button>
        <div>{{ getUserInformation() }}</div>
      </div>
    </div>
    <dialog ref="loginModal">
      <div class="w-full max-w-sm p-6 bg-gray-200 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="text" class="block text-sm font-medium text-gray-700">Username:</label>
            <input type="text" id="email" v-model="username" required
              class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring">
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" v-model="password" required
              class="w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring">
          </div>
          <div class="flex items-center justify-between">
            <button @click="closeModal"
              class="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 m-1">
              Cancel
            </button>
            <button type="submit"
              class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 m-1">
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
      return localStorage.getItem('userInformation');
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