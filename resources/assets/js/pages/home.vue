<template>
  <div class="col-lg-6 m-auto">
    <div class="card">
      <div class="card-header">
        <div class="text-left">Home</div>
      </div>
      <div class="card-body">
        Welcome <span v-if="authenticated">{{ user.name }} ({{ user.email }})</span>

        <div class="mt-5">
          <button @click="openCustomer()" class="btn btn-primary">
            Click here to test customer web route...
          </button>
        </div>

        <div class="mt-5">
          <a href="#" @click.prevent="logout">
            Logout
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user'
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push({name: 'login'})
    },
    openCustomer() {
      window.open('/customer')
    }
  },
}
</script>
