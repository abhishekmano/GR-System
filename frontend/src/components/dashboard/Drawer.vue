<template>
    <div>
      <md-toolbar class="md-transparent drawer-toolbar" md-elevation = 0>
        <md-avatar class="md-large">
          <img :src="images.cet">
        </md-avatar>
      </md-toolbar>
      <md-list style="padding-top: 25px;">
          <router-link to = "/dashboard" >
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>          
          </router-link>
          <router-link to = "/profile"  >
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">Profile</span>
          </md-list-item>
          </router-link>

          <router-link to = "/contact" >
            <md-list-item>
            <md-icon>help</md-icon>
            <span class="md-list-item-text">Contact Us</span>
          </md-list-item>
          </router-link>
          
        </md-list>
    </div>
</template>

<script>
export default {
    name: "Drawer",
    data: function(){
      return {
        images:{
          cet: require('../../assets/cet-logo.png')
        }
      }
    },
    methods:{
      route: function(r){
        console.log("routing....");
  		  this.$router.push('/'+r);
      }
    }
}
</script>

<style>

.md-avatar.md-large {
    min-width: 64px;
    min-height: 64px;
    font-size: 32px;
    margin-top: 45px;
    border-radius: 10px !important;
}

.md-list-item-content{
  padding: 28px 80px !important;
}

.md-list-item-text{
  font-size: 15pt;
  color: grey;
}

.md-list.md-theme-default .router-link-exact-active .md-list-item-content .md-list-item-text{
  font-size: 20pt;
  color :black;

}


</style>
