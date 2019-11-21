<template>
  <div>
    <form novalidate class="md-layout md-alignment-space-around-center" style="padding-top: 5vh">
      <md-card class="md-layout-item login-form">
        <md-card-header>
          <div class="md-title" style="font-weight:bolder; font-size: 20pt;"><strong>Log In</strong></div>
        </md-card-header>

        <md-card-content class="md-layout md-alignment-space-around-center " style="padding: 30px;">
          <md-field v-bind:class="{'md-invalid': error.userErr}" class="md-layout-item">
            <label for="email">User Name</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.userName"/>
            <span class="md-error" >{{ error.userMsg }}</span>
          </md-field>
        </md-card-content>

        <md-card-content class="md-layout md-alignment-space-around-center content" style="padding: 30px;">
          <md-field v-bind:class="{'md-invalid': error.passErr}" class="md-layout-item">
            <label for="email">Password</label>
            <md-input type="password" name="email" id="email" autocomplete="email" v-model="form.password"/>
            <span class="md-error">{{ error.passMsg }}</span>
          </md-field>
 
                    <div>
                     <md-card class="md-layout-item md-size-70 ">
                         
                        <md-dialog :md-active.sync="showDialog">
                        <md-dialog-title style="font-size: 16pt; text-align: center;">Forgot Password</md-dialog-title>
                        
                        <div class="popup">
                            <md-field v-bind:class="{'md-invalid': error.mailerr}" class="md-layout-item">  
                                <label for="oldpassword">Enter registered email id</label>
                                <md-input name="oldpassword" id="oldpassword" v-model="form.emailid" /> 
                                <span class="md-error">{{ error.mailMsg }}</span>  
                            </md-field>
                         </div>
                        <md-dialog-actions>
                            <md-button class="md-primary login-button" @click="forgotp"  style="color: #ffffff !important;">Submit</md-button>
                            <md-button class="md-primary login-button" @click="showDialog = false" style="color: #ffffff !important;">Cancel</md-button>

                        </md-dialog-actions>
                        </md-dialog>  
                         
                     </md-card>
                    </div>

                    <div style="padding: 1.5vh">
                     <md-card class="md-layout-item">
                         
                        <md-dialog :md-active.sync="submitFlag">
                        <md-dialog-title>Reset link sent</md-dialog-title>
                        <md-card-content>
                            We have sent a link to your registered email.
                        </md-card-content>
                        </md-dialog>  

                     </md-card>
                    </div>
   
        </md-card-content>
        <md-card-actions>
                      <md-button  @click="submit" class="md-dense md-raised md-primary login-button" style="font-size: 13pt;">Log In</md-button>

        </md-card-actions>
        <md-card-actions md-alignment="space-between" style="text-align: center; padding: 25px; margin-top: 50px;">
            <a style="cursor: pointer; color: black !important;" @click="toggle">Not registered? Click here </a>
            <a style="cursor: pointer; color: black !important;" @click="showDialog = true">Forgot Password </a> 
            <!--<md-button  @click="submit" class="md-dense md-raised md-primary login-button">Log In</md-button>-->
        </md-card-actions>
      </md-card>
    </form>
  </div>
  
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    data: function(){
      return{
        form: {
          userName:null,
          password:null,
          emailid:null
        },
        error: {
          userErr: false,
          userMsg: null,
          passErr: false,
          passMsg: null,
          mailerr: false,
          mailMsg: null
        },
        showDialog:false,
        submitFlag: false
      }
    },
    methods: {
       submit:function(){
        // console.log(this.form);
        this.error.userErr = this.error.passErr = false
        this.error.userMsg = this.error.passMsg = null
        var self=this;
        this.$store.dispatch('login', {
          userName: this.form.userName,
          password: this.form.password
        })
        .then(() => {
          self.$router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err.message);
          if(err.message == 'no such username'){
            self.error.userErr = true
            self.error.userMsg = "Username is incorrect"
          }else if(err.message == 'incorrect password'){
            self.error.passErr = true
            self.error.passMsg = "Password is incorrect"
          }
          else if(err.message == 'Missing credentials'){
            if(self.userName == null){
              self.error.userErr = true
              self.error.userMsg = "Enter valid username"
            }
            if(self.password == null){
              self.error.passErr = true
              self.error.passMsg = "Enter valid password"
            }
          }
          else if(err.message == "User not verified"){
              self.$router.push({name: 'verify', params:{username:self.form.userName}})
          }
        })
      },
      toggle:function(){
          this.$emit('toggle')
      },
      forgotp:function(){
        //this.showDialog = false,
        //this.submitFlag = true,
        console.log("forgotpcalled");
        var data ={
          email : this.form.emailid
        }
        console.log(data);
        axios.post(process.env.VUE_APP_ROOT_API+'auth/forgotp',data)
        .then((res)=>{
              if(res.data.success){
                this.showDialog = false,
                this.submitFlag = true,
                this.error.mailerr = false;
                console.log("Mail id found");
              }
              else {
                this.error.mailMsg = 'Enter a valid mail id';
                this.error.mailerr = true ;
                console.log(res.data.error)
                console.log("mail id absent");
              }
        })
        .catch((err)=>{
              console.log(err);
        })
      },  
      makenull:function(){
        console.log("making empty");
        this.form.userName = null;
        this.form.password = null;
      }
    },
    mounted(){
      console.log("Mounted");
      this.makenull();
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .login-form{
    border-radius: 15px;
    padding-top: 10px;
    height: 550px !important;

  }

  // .login-button{
  //   background-color: #00b73d !important;
  //   border-radius: 10px; 
  //   text-align: center;
  //   font-weight: bold;
  //   padding-left: 2%;
  //   padding-right: 2%;
  //   padding-top: 4px;
  // }

  .login-button {
    text-transform: none;
    height: 40px !important;
    width: 120px !important;
    border-radius: 10px;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 0px;

 z-index: 1;
  position: relative;
  font-weight: bold;
  font-family: inherit;
  color: white !important;
  //padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(0, 0%, 11%) !important;
  overflow: hidden;
  transition: color 0.4s ease-in-out;
}

.login-button::before {
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
  transition: transform 0.6s ease-in-out;
}

.login-button:hover {
  cursor: pointer;
  color:white !important;
}

.login-button:hover::before {
    content: '';
   transform: translate3d(50%, -50%, 0) scale3d(30, 30, 30);
}

.md-card-actions.md-alignment-right{
  justify-content: center;
}

.popup{
  padding: 20px;
}
  .md-dialog{
    border-radius: 15px;
  }

  .md-dialog-actions{
    justify-content: space-around;
  }
/*  */
</style>