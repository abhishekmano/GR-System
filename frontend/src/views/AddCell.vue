<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav='showNavigation = !showNavigation'/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer/>
        </md-app-drawer>
        <md-app-content >
               <!-- <span style="font-size: 50pt;">entehlum kuthi kett</span> -->

               <md-card class="card">
                   <md-card-header>
                    <div class="md-title" style="font-weight: bold; font-size: 20pt;">Add Cell Member</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field  v-bind:class="{'md-invalid': error.userErr}" class="md-layout-item">
                                <label for="cellid">Cell Name</label>
                                <md-input class="cellname" name="cellname" id="cellname" v-model="form.name"/>
                                <span class="md-error">{{ error.userMsg }}</span>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="username">Username</label>
                                <md-input class="username" name="username" id="username" v-model="form.username" />
                            </md-field>
                        </div>

                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field v-bind:class="{'md-invalid': error.phoneErr}" class="md-layout-item">
                                <label for="phone">Phone</label>
                                <md-input class="Phone" name="Phone" id="Phone" v-model="form.phone" />
                                <span class="md-error">{{ error.phoneMsg }}</span>
                            </md-field>
                        </div>

                         <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field v-bind:class="{'md-invalid': error.mailErr}" class="md-layout-item">
                                <label for="phone">Email</label>
                                <md-input class="email" name="email" id="email" v-model="form.email" />
                                 <span class="md-error">{{ error.mailMsg }}</span>
                            </md-field>
                        </div>
                         <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="phone">Temporary Password</label>
                                <md-input class="password" name="password" id="password" v-model="form.password" />
                            </md-field>
                        </div>
                    </div>
                     <!-- <span>------baaki details entha vende nnu vecha addikko------</span>   -->
                </md-card-content>
                <md-card-actions>
                          <md-button type="submit" class="md-raised md-primary update" @click="addCell" >Add cell</md-button>   
                </md-card-actions>
               </md-card>
        </md-app-content>
    </md-app>
    
</template>

<script>

import axios from 'axios'
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'

export default {
    name: 'AddCell',
    components: {
        Navbar,
        Drawer
    },
     data: function(){
    return {
      form:{
          username:"",
          name:"",
          email:"",
          phone:"",
          oldpassword:"",
          newpassword:"",
          confpassword:"",
          password:""
          
      },
      error: {
          passErr: false,
          passMsg: null,
          oldpassErr : false,
          oldpassMsg : null,
          mailErr :false,
          mailMsg :null,
          phoneErr:false,
          phoneMsg: null,
          userErr: false,
          userMsg:null,
        },
      
      showDialog:false,
      showNavigation: false,
      newcell: false,
      incPass: false,
      updPass : false
    }
  },  
  methods:{
      addCell:function(){
          console.log("updating.....")
          var self = this
          var data = {
              username: this.form.username,
              name: this.form.name,
              usertype: "cell",
              email: this.form.email,
              phone:this.form.phone,
              password:this.form.password
              }
          console.log(data);
          var config={
              headers: { 
                  Authorization: "Bearer " + this.$store.getters.bearerToken
               }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'auth/celljoin',data,config)
            .then((res)=>{
                if(res.data.Success){
                    this.newcell = true
                console.log("saved ");
                //console.log(res);
                }
                else{
                    console.log(res.data.error);
                    if(res.data.error == "mail,phone error"){
                        this.error.phoneErr = true;
                        this.error.phoneMsg = "Enter valid ata"
                        this.error.mailErr = true ;
                        this.error.mailMsg = "Enter valid data";
                    }
                    else if(res.data.error = "Email already in use"){
                        this.error.mailErr = true ;
                        this.error.mailMsg = "Email already in use";
                    }
                    else if(res.data.error = "username error"){
                        this.error.userErr = true ;
                        this.error.userMsg = "Enter valid username";
                    }
                    console.log("something wrong");
                }
                  
            })
            .catch((err)=>{
                console.log("Failed");
                console.log(err);
            })
      },
  },

}
</script>

<style lang="scss" scoped>
.md-primary{
    background: hsl(0, 0%, 11%) !important;
}
.md-app{
    height: inherit;
  }

   // Demo purposes only
.md-drawer {
    width: 400px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 160px;
  }

// .md-table-cell{
//     text-align: left;
// }

.md-card{
    border-radius: 20px;
    width: 700px;
    height: auto;
}
.card{
    text-align: center;
    left: 50%;
    transform: translate(-50%);
}
</style>