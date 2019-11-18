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
            <md-card class="md-layout-item md-size-45">
                <md-card-header>
                    <div class="md-title" style="font-weight: bold; font-size: 20pt;">Profile</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="username">Username</label>
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
                     <md-card class="md-layout-item md-size-45">
                         
                        <md-dialog :md-active.sync="showDialog">
                        <md-dialog-title style="text-align:center;">Change Password</md-dialog-title>
                        
                        <div style="padding:35px;" >  
                            <md-field v-bind:class="{'md-invalid': error.oldpassErr}" class="md-layout-item">
                                <label for="oldpassword">Old Password</label>
                                <md-input type ="password" name="oldpassword" id="oldpassword" v-model="form.oldpassword" /> 
                                <span class="md-error">{{ error.oldpassMsg }}</span>  
                            </md-field>
                        
                            <md-field>  
                                <label for="newpassword">New Password</label>
                                <md-input type ="password" name="newpassword" id="newpassword" v-model="form.newpassword" />   
                            </md-field>

                             <md-field v-bind:class="{'md-invalid': error.passErr}" class="md-layout-item">
                                <label for="newpassword">Confirm New Password</label>
                                <md-input type ="password" name="newpassword" id="newpassword" v-model="form.confpassword" /> 
                                <span class="md-error">{{ error.passMsg }}</span>  
                            </md-field>
                         </div>
                        <md-dialog-actions style="padding: 5%; margin-bottom: 2%;">
                            <md-button class="md-primary" @click="showDialog = false"  style="font-size: 11pt;">Close</md-button>
                            <md-button ref="uploadBtn" class="md-primary" @click="checkPassword"  style="font-size: 11pt;">Confirm</md-button>
                        </md-dialog-actions>
                        </md-dialog>  
                         
                     </md-card>
                    </div>


                    <div>
                     <md-card class="md-layout-item md-size-45">
                         
                        <md-dialog :md-active.sync="updProf">
                        <md-dialog-title style="text-align:center;">Update Profile</md-dialog-title>
                        
                        <div style="padding:35px; text-align : center;" >
                            <span>Details has been updated.</span>
                         </div>
                        </md-dialog>  
                         
                     </md-card>
                    </div>


                     <div>
                     <md-card class="md-layout-item md-size-45">
                         
                        <md-dialog :md-active.sync="updPass">
                        <md-dialog-title style="text-align:center;">Update Password</md-dialog-title>
                        
                        <div style="padding:35px; text-align : center;" >
                            <span>Password has been updated.</span>
                         </div>
                        </md-dialog>  
                         
                     </md-card>
                    </div>

                    <div>
                     <md-card class="md-layout-item md-size-45">
                         
                        <md-dialog :md-active.sync="incPass">
                        <md-dialog-title style="text-align:center;">Password Update Failed</md-dialog-title>
                        
                        <div style="padding:35px; text-align : center;" >
                            <span>Password not updated.</span>
                         </div>
                        </md-dialog>  
                         
                     </md-card>
                    </div>
   <!--  Modal Ends -->

             </md-card-content>
                <md-card-actions>
                    <md-button type="submit" class="md-raised md-primary update" @click="updateProfile" >Update Profile</md-button>
                    <md-button type="submit" class="md-raised md-primary change" @click="showDialog = true" style="font-size: 9pt;" >Change Password</md-button>
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

.md-card{
    border-radius: 15px;
}
 .md-primary{
   background-color:  #00b73d !important;

.md-button.md-theme-default.md-primary{
    color: white !important;
}
 }
 
 .md-card-actions.md-alignment-right {
    justify-content: space-around;
    padding: 5%;
}
 

 .md-button{
    justify-content: space-around;
    text-transform: none;
    height: 40px !important;
    width: 153px !important;
    border-radius: 10px;
    padding-left: 2%;
    padding-right: 2%;
    // padding-top: 1px;

 z-index: 1;
  position: relative;
  font-weight: bold;
  font-family: inherit;
  color: white !important;
  //padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(125, 58%, 24%) !important;
  overflow: hidden;
  transition: color 0.4s ease-in-out;
}

.md-button::before {
   content: '';
  z-index: -1;
  position: absolute;
  top: 100%;
  right: 100%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #3cefff !important;
  transform-origin: center;
  transform: translate3d(50%, -50%, 0) scale3d(0, 0, 0);
  transition: transform 0.45s ease-in-out;
}

.md-button:hover {
  cursor: pointer;
  color:white !important;
}

.md-button:hover::before {
   transform: translate3d(50%, -50%, 0) scale3d(15, 15, 15);
}

.update{
    width: 130px !important;
    font-size: 10pt !important;
}

.change{
    font-size: 10pt !important;
}

.md-dialog{
    border-radius: 15px;
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
          name:"",
          email:"",
          phone:"",
          oldpassword:"",
          newpassword:"",
          confpassword:"",
          usertype:this.$store.getters.usertype
          
      },
      error: {
          passErr: false,
          passMsg: null,
          oldpassErr : false,
          oldpassMsg : null
        },
      
      showDialog:false,
      showNavigation: false,
      updProf: false,
      incPass: false,
      updPass : false
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
                this.updProf = true
                console.log("saved ");
                console.log(res);  
                alert("Profile updated");
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
        console.log(data);
        var config={
            headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
        }
        axios.post(process.env.VUE_APP_ROOT_API+'profile/'+this.$store.getters.usertype+'/updatepwd',data,config)
            .then((res)=>{
                if (res.data.success) {
                    this.updPass = true
                     //self.$router.push('/')
                }
                if(res.data.success == false){
                    this.showDialog = true;
                    console.log("old Password is not correct");
                    this.error.oldpassMsg = "Incorrect Password";
                    this.error.oldpassErr = true;
                    //this.incPass = true
                }
                console.log(res.data.success);
                console.log(this.updPass);
                console.log(this.incPass);

                this.form.confpassword="";
                this.form.newpassword="";
                this.form.oldpassword="";
                
            })
            .catch((err)=>{
                console.log(err);
            })  
      },

      checkPassword:function(){
             
          if(this.form.confpassword == this.form.newpassword){
              this.changePassword();
              
          }

          else{
              console.log("password doesnt match");
              this.error.passErr = true;
              this.error.passMsg = "Passwords Doesnt match";
              //this.incPass=true;
              //this.showDialog=false;
          }
      }
  },
  mounted(){
      console.log("Retrieving profile");
      console.log(this.$store.getters.usertype);
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
