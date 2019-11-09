<template>
  <md-app >
    <md-app-toolbar class="md-primary" >
      <Navbar @toggleNav = "showNavigation = !showNavigation" />
    </md-app-toolbar>
    <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
      <Drawer />
    </md-app-drawer>
    <md-app-content>
            <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-70">
                <md-card-header>
                    <div class="md-title">Profile</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <md-input disabled="true" name="username" id="username" v-model="form.username" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="name">Name</label>
                                <md-input  name="name" id="name" v-model="form.name" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="email">Email</label>
                                <md-input name="email" id="email" v-model="form.email" />
                            </md-field>
                        </div>
                         <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="phone">Phone</label>
                                <md-input name="phone" id="phone" v-model="form.phone" />
                            </md-field>
                        </div>

                    </div>


  <!--  Modal -->

                    <div>
                     <md-card class="md-layout-item md-size-70">
                         
                        <md-dialog :md-active.sync="showDialog">
                        <md-dialog-title>Change Password</md-dialog-title>
                        
                        <div style="padding:1.5vh">
                            <md-field>  
                                <label for="oldpassword">Old Password</label>
                                <md-input type ="password" name="oldpassword" id="oldpassword" v-model="form.oldpassword" />   
                            </md-field>
                        
                            <md-field>  
                                <label for="newpassword">New Password</label>
                                <md-input type ="password" name="newpassword" id="newpassword" v-model="form.newpassword" />   
                            </md-field>

                            <md-field>  
                                <label for="newpassword">Confirm New Password</label>
                                <md-input type ="password" name="newpassword" id="newpassword" v-model="form.confpassword" />   
                            </md-field>
                         </div>
                        <md-dialog-actions>
                            <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                            <md-button ref="uploadBtn" class="md-primary" @click="changePassword">Confirm</md-button>
                        </md-dialog-actions>
                        </md-dialog>  
                         
                     </md-card>
                    </div>
   <!--  Modal Ends -->

             </md-card-content>
                        <md-card-actions>
                            <md-button type="submit" class="md-raised md-primary" @click="updateProfile">Update Profile</md-button>
                            <md-button type="submit" class="md-raised md-primary" @click="showDialog = true">Change Password</md-button>
                        </md-card-actions> 

            </md-card>

        </div>
    </md-app-content>
  </md-app>
</template>

<style lang="scss" scoped>
  @import "~vue-material/src/theme/engine";

  @include md-register-theme("green-card", (
    primary: md-get-palette-color(green, 300)
  ));

  @include md-register-theme("black-card", (
    primary: md-get-palette-color(black, 500)
  ));

  @include md-register-theme("purple-card", (
    primary: md-get-palette-color(purple, 500)
  ));

  @include md-register-theme("orange-card", (
    primary: md-get-palette-color(orange, 200)
  ));

  @import "~vue-material/src/base/theme";
  @import "~vue-material/src/components/MdCard/theme";
.md-app{
    height: inherit;
  }


 .md-primary{
   background-color:  #00b73d !important;

.md-button.md-theme-default.md-primary{
    color: white !important;
}
 }
  
</style>

<script>
  import Navbar from '@/components/dashboard/Navbar'
  import Drawer from '@/components/dashboard/Drawer'
  import axios from 'axios'
export default {
  name: 'dashboard',
  components:{
    Navbar,
    Drawer,
  },
  data: function(){
    return {
      form:{
          username:this.$store.getters.userName,
          name:"Test",
          email:"email@email.com",
          phone:"123456789",
          oldpassword:"",
          newpassword:"",
          confpassword:"",
          usertype:this.$store.getters.usertype
          
      },
      
      showDialog:false,
      showNavigation: false
    }
  },
  methods:{
      updateProfile:function(){
          console.log("updating.....")
          var self = this
          var data = {
              username: this.form.username,
              name: this.form.name,
              usertype: this.form.usertype,
              email: this.form.email,
              phone:this.form.phone
              }
          console.log(data);
          var config={
              headers: { 
                  Authorization: "Bearer " + this.$store.getters.bearerToken
               }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'profile/'+data.usertype+'/updateProfile',data,config)
            .then((res)=>{
                console.log("saved ");
                console.log(res.data.err);              
                //alert("Profile updated");
            })
            .catch((err)=>{
                console.log("Failed");
                console.log(err);
            })
      },
      changePassword:function(){
        this.showDialog = false
        console.log("changing.....")
        var self = this
        var data = {
            username: this.$store.getters.userName,
            old: this.form.oldpassword,
            password: this.form.newpassword
        }
        var config={
            headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
        }
        axios.post(process.env.VUE_APP_ROOT_API+'profile/'+this.$store.getters.usertype+'/updatepwd',data,config)
            .then((res)=>{
                if (res.data.success) {
                    alert("Password Updated ");    // Daaa ivide oru variable true vech puthiya box kanik
                    self.$router.push('/')
                }
                else{
                    alert("incorrect password");   // ividem
                }
                console.log(res.data.success);
                
            })
            .catch((err)=>{
                console.log(err);
            })  
      }
  },
  mounted(){
      console.log("Retrieving profile");
        var self = this;
        axios.get(process.env.VUE_APP_ROOT_API+'profile/'+this.$store.getters.usertype+'/getProfile',{
            params: {
                username:this.$store.getters.userName
            },
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }                
        })
        .then((res) => {
            console.log(res.data);
            
            if(res.data.success){
                self.form.name = res.data.name
                self.form.email = res.data.email
                self.form.phone = res.data.phone
            }
            else{
                console.log("ERR "+res.data.error)
            }
        })
        .catch((err) => {
            console.log("ERR "+ err);            
        })
  }
}
</script>
