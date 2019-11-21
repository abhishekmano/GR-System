<template>
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start menuicon" @click="toggleNav">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="head">
          <span class="header">Grievance Cell</span> <br>
          <span style="font-size: 11pt; opacity: 50%;">College of Engineering ,Trivandrum</span>
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

.head{
  margin-left: 3.5%;
}

.header{
  font-family: 'Roboto', sans-serif;
  font-size: 20pt;
  font-weight:500;
}

.md-toolbar-row{
  background-color: hsl(0, 0%, 11%) !important;
  padding: 17px;
}
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
    
  }

  .md-drawer{
    height: 400vh;
  }

  .logout{
    width: 120px;
    border-radius: 10px;
    border-color: black;
    background-color: #5a5a5a;
    font-weight: bold;
    text-transform: none;
  }

   @media only screen and (min-width: 600px) {
     .menuicon{
        display: none;
     }
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
