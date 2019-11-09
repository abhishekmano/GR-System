<template>
<!--   <div class="home">
    <Dashboard />
  </div> -->
  <div class="md-layout md-alignment-center-center home ">
    <div class="md-layout-item md-size-35 md-xsmall-size-100 md-small-size-100 image-header">
      <img :src="images.cet" />
      <h1> College of Engineering Trivandrum </h1>
      <h2> Online Grievance Redressal System </h2>
    </div>
    <div class="md-layout-item md-size-25 md-xsmall-size-90 md-small-size-90 signup-form" style="margin: 70px;">
      <login v-if="!register" @toggle="toggleReg" />
      <register v-if="register" @toggle="toggleReg"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* import Dashboard from '@/components/dashboard/Master'
 */
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
export default {
  name: 'home',
  components: {
    Login,
    Register
  },
  data: () => ({
    register: false,
    images:{
      cet: require('../assets/cet-logo.png')
    }
  }),
  methods: {
    toggleReg: function(){
      this.register = !this.register
    }
  }
}
</script>

<style>
.md-alignment-center-center{
  height: inherit;
}
/* .home{
  background: url('../assets/cet-bg.jpg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 175%; 
} */
h1{
  line-height: initial;
  font-size: 25pt;
}
.image-header{
  padding: 2vh;
  margin: 200px;
  
}
@media screen and (max-width: 960px) {
  .image-header{
    padding: 4vh;
    
  }
  .signup-form{
    padding-bottom: 15vh;
  }
}


</style>

