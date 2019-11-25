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
      <AdminLogin/>
    </div>

     <div class="footer">
        <md-icon style="color: rgb(153, 153, 153);"> call </md-icon> &nbsp;
        <span> +91-1234567</span>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <md-icon style="color: rgb(153, 153, 153);"> email </md-icon> &nbsp;
        <span>  grievancecell@cet.ac.in </span>
     </div>

  </div>
</template>

<script>
// @ is an alias to /src
/* import Dashboard from '@/components/dashboard/Master'
 */
import AdminLogin from '@/components/auth/AdminLogin'
export default {
  name: 'adminlogin',
  components: {
    AdminLogin
  },
  data: () => ({
    register: false,
    images:{
      cet: require('../assets/cet-logo.png')
    }
  }),
//   methods: {
//     toggleReg: function(){
//       this.register = !this.register
//     }
//   }
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
}

.footer{
   font-family: 'Roboto' , sans-serif;
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: rgb(41, 41, 41);
   color: rgb(153, 153, 153);
   text-align: center;
   padding: 20px;
   box-shadow: 0 8px 6px 6px black;
}
</style>

