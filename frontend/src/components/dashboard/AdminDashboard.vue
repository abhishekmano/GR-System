<template>
    <div style="padding-top: 50px;">
        <div class="md-layout md-gutter md-alignment-top-center">
          <a @click="route('status')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title" style="font-size: 15pt;">Change User Password</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-2x" style="color: rgb(83, 172, 255);">edit</md-icon>
                </md-card-content>
              </md-ripple>
            </md-card>
          </a>
          <a @click="route('addCell')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title" style="font-size: 15pt;">Add Cell Member</div>
                </md-card-header>

                <md-card-content>
                  <!-- <md-icon class="md-size-2x" style="color: orange;">history</md-icon> -->
                  <span style="font-size: 40pt; font-weight: bolder; color: green;"> + </span>
                </md-card-content>
              </md-ripple>
            </md-card>
          </a>
        </div>
        <div class="md-layout md-gutter md-alignment-top-center">
          <a @click="route('closed')">
          <md-card md-with-hover>
            <md-ripple>
              <md-card-header>
                <div class="md-title" style="font-size: 15pt;">Remove Cell Member</div>
              </md-card-header>

              <md-card-content>
                   <span style="font-size: 40pt; font-weight: bolder; color: red;"> x </span>
              </md-card-content>
            </md-ripple>
          </md-card>
          </a>
        </div>      
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'AdminDashboard',
    data: function(){
        return {
            form:{
                username:"",
                password:"",
                type:""
            }
        }
    },
    methods:{
        submit: function(){
            console.log("changing.....")
            var self = this
            var data = {
                username: this.form.username,
                password: this.form.password,
                type: this.form.type
            }
            var config={
                headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'admin/changepwd',data,config)
                .then((res)=>{
                    console.log(res.data)
                    alert("Password Changed Successfully")
                    self.$router.push('/')
                })
                .catch((err)=>{
                    alert("Error encountered : "+err)
                    console.log(err);
                })  
            },
        route:function(r){
            console.log("routing....");
            this.$router.push('/'+r);
        },
        logout:function(){
        console.log("logging out...");
        this.$store.dispatch('logout')
        this.$router.push('/')
        },
    }
}


</script>

<style lang="scss" scoped>
.md-card {
    border-radius: 15px;
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

     // Demo purposes only
  .md-drawer {
    width:400 px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 70px;
  }

  .md-layout{
    padding-top: 16px;
  }
</style>
