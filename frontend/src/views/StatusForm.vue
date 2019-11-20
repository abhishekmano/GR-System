<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav='showNavigation = !showNavigation'/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer/>
        </md-app-drawer>
        <md-app-content>
            <div class="md-layout md-alignment-center-center" v-if="!success">
                <form novalidate>
                    <md-card class="md-layout-item">
                        <md-card-header>
                            <span class="md-display-2"><strong>Enter Token Number</strong></span>
                        </md-card-header>
                        <md-card-content class="md-layout md-alignment-space-around-center">
                            <md-field v-bind:class="{'md-invalid': error.tokenErr}" class="md-layout-item">
                                <label for="token">Token</label>
                                <md-input type="text" name="token" id="token" autocomplete="token" v-model="form.token"/>
                                <span class="md-error" >{{ error.tokenErrMsg }}</span>
                            </md-field>
                        </md-card-content>
                        <md-card-actions md-alignment="space-between" style="justify-content: center;">
                            <md-button  @click="submit" class="md-dense md-raised md-primary submit">Submit</md-button>
                        </md-card-actions>
                    </md-card>
                </form>
            </div>
            <div v-if="success">
                <div class="md-layout md-alignment-top-left">
                     <a @click="success = !success" class="return">
                        <md-icon class="md-size-2x">
                            arrow_back
                        </md-icon>
                    </a>
                </div>
                <div class="md-layout md-gutter md-alignment-center-center" style="padding: 20px;">
                    <!-- <md-card>
                        <md-card-header>
                            <span class="md-headline">{{ data.title }}</span>
                        </md-card-header>
                        <md-card-content>
                            <span class="md-body-1">Status: {{ data.status }}</span>
                        </md-card-content>
                    </md-card> -->
                    <!-- <span class="md-title md-layout-item md-size-90 md-small-size-100" style="padding: 20px; font-weight: bold; font size: 20pt; text-align : left;">{{ data.title }}</span> -->
                    <br>
                    <md-card class="md-layout-item md-size-90 md-small-size-100">
                        <md-card-content>
                    <span class="md-title md-layout-item md-size-90 md-small-size-100" style="padding: 20px; font-weight: bold; font size: 20pt; text-align : left;">{{ data.title }}</span>

                                <md-list class="">
                                    <md-list-item class="">Token Number : {{ data.token }}</md-list-item>
                                    <md-list-item class="">Created on : {{ data.date_created }}</md-list-item>
                                    <md-list-item class="">Grievance Status : {{ data.status }}</md-list-item>
                                    <md-list-item v-if="data.status == 'resolved'">Resolved on : {{ data.resolve_date }}</md-list-item>
                                    <md-list-item v-if="data.status == 'resolved'">Remarks : {{ data.remark }}</md-list-item>

                                </md-list>
                        </md-card-content>
                    </md-card>

                </div>
            </div>             
        </md-app-content>
    </md-app>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
export default {
    name: 'StatusForm',
    components:{
        Navbar,
        Drawer
    },
    data:function(){
        return {
            form:{
                token:null
            },
            error:{
                tokenErr: false,
                tokenErrMsg: null
            },
            showNavigation: false,
            success: false,
            data: null
        }
    },
    methods:{
        submit:function(){
            this.tokenErr = null
            this.tokenErrMsg = null
            var self = this
            if(this.form.token === null){
                this.error.tokenErr = true;
                this.error.tokenErrMsg = "Enter valid token"
                console.log("null error");
            }
            else{
                axios.get(process.env.VUE_APP_ROOT_API+'grievance/user/token',{
                    params:{
                        token:this.form.token
                    },
                    headers: { 
                        Authorization: "Bearer " + this.$store.getters.bearerToken 
                    }
                })
                .then((res) => {
                    console.log(res);                
                    if(res.data.info === null || res.data.info === undefined){
                        self.error.tokenErr = true;
                        self.error.tokenErrMsg = "invalid token"
                        return
                    }
                    self.success = true
                    self.data = res.data.info
                })
                .catch((err) => {
                    console.log(err);            
                })
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.md-app{
    height: inherit;
}
.md-drawer {
    width: 400px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 16px;
  }

  .md-title{
      font-size: 25px;
  }

  .md-card{
      border-radius: 15px;
      padding: 25px;
  }

.submit{
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
  background-color: hsl(125, 58%, 24%) !important;
  overflow: hidden;
  transition: color 0.4s ease-in-out;
}

.submit::before {
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

.submit:hover {
  cursor: pointer;
  color:white !important;
}

.submit:hover::before {
   transform: translate3d(50%, -50%, 0) scale3d(30, 30, 30);
}

</style>
