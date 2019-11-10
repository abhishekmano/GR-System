<template>
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start" @click="toggleNav">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-section-end">
          <md-button v-if="!$store.getters.isLoggedIn" @click="route('login')">
            Login
          </md-button>

          <md-button v-if="!$store.getters.isLoggedIn" @click="route('signup')">
            Sign Up
          </md-button>

          <md-button v-if="$store.getters.isLoggedIn" @click="logout" class="logout">
            Log out
          </md-button>

        </div>
      </div>
</template>

<style lang="scss" scoped>

.md-toolbar-row{
  background-color: #00b73d !important;
}
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
    
  }

  .md-drawer{
    height: 400vh;
  }

  .logout{
    border-radius: 10px;
    border-color: black;
    background-color: #018f30;
    font-weight: bold;
    text-transform: none;
  }
</style>

<script>
export default {
  name: 'Navbar',
  data: function(){
    return {
      showNavigation: false
    }
  },
  methods:{
  	route:function(r){
  		console.log("routing....");
  		this.$router.push('/'+r);
  	},
  	logout:function(){
      console.log("logging out...");
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    toggleNav(){
      this.$emit('toggleNav')
    }
  }
}
</script>
