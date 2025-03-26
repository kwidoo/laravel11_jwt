<template>
  <div class="app-layout d-flex flex-column">
    <div id="content" class="container-fluid col h-100">
      <div class="row h-100">
        <div class="col mw-25">
          <div class="p-4 mb-3 min-vh-80">
            <transition mode="out-in" name="page">
              <slot>
                <router-view></router-view>
              </slot>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'app-layout',
  computed: {
    ...mapGetters({
      authenticated: 'auth/check'
    })
  },
}
</script>
