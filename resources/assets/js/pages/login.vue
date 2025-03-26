<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <div class="card">
        <div class="card-header">
          <div class="text-left">Login</div>
        </div>
        <div class="card-body">
          <form @submit.prevent="login" @keydown="form.onKeydown($event)">
            <div class="form-group row">
              <label class="col-md-3 col-form-label text-md-right">Email</label>
              <div class="col-md-7">
                <input v-model="form.email" type="email" name="email" class="form-control"
                       :class="{ 'is-invalid': form.errors.has('email') }">
                <has-error :form="form" field="email"></has-error>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label text-md-right">Password</label>
              <div class="col-md-7">
                <input v-model="form.password" type="password" name="password" class="form-control"
                       :class="{ 'is-invalid': form.errors.has('password') }">
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-md-7 offset-md-3 d-flex">
                <button :disabled="form.busy" class="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Form from 'vform'

  export default {
    data: () => ({
      form: new Form({
        email: '',
        password: ''
      }),
      userID: null,
      validation: true,
      data: null
    }),

    methods: {
      async login() {
        // Submit the form.
        const {data} = await this.form.post('/api/login')

        this.data = data
        this.userID = data.user.id
        this.redirect()
      },
      async redirect() {
        // Save the token.
        this.$store.dispatch('auth/saveToken', {
          token: this.data.token,
          remember: this.remember
        })

        // Fetch the user.
        await this.$store.dispatch('auth/fetchUser')

        // Redirect to previous page or home in case nothing was specified
        if (this.$route.query && this.$route.query.from) {
          this.$router.push(this.$route.query.from)
        } else {
          this.$router.push({name: 'home'})
        }
      },
    }
  }
</script>
