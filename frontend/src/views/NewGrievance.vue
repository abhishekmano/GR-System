<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav = "showNavigation = !showNavigation"/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer />
        </md-app-drawer>
        <md-app-content>
            <div class="md-layout md-alignment-center-center">
            <md-card class="md-layout-item md-size-55" style="border-radius : 15px; height: 450px;">
                <md-card-header>
                    <div class="md-title" style="font-size: 20pt; padding: 15px;"><strong>Create new Grievance </strong></div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="title">Title</label>
                                <md-input name="title" id="title" v-model="form.title" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="description">Description</label>
                                <md-input name="description" id="description" v-model="form.description" />
                            </md-field>
                        </div>
                        <!-- <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="remark">Remarks</label>
                                <md-input name="remark" id="remark" v-model="form.remark" />
                            </md-field>
                        </div> -->
                    </div>
   <!-- FIle upload Modal -->

                    <div>
                        <md-dialog :md-active.sync="showDialog" class="file">
                        <md-dialog-title style="text-align: center; font-size: 17pt; font-weight: bold;">Upload File</md-dialog-title>
                        <md-field> 
                                <!-- <label for="file">Select File</label> -->
                                <input type='file' name='file' id="file" @change='onFileSelected'>
                            </md-field>
                        <md-dialog-actions>
                            <md-button class="md-primary" @click="showDialog = false" style="color: white !important;">Close</md-button>
                            <md-button ref="uploadBtn" class="md-primary" @click="uploadFile" style="color: white !important;">Upload</md-button>
                        </md-dialog-actions>
                        </md-dialog>  
                    </div>
   <!-- FIle upload Modal Ends -->
                </md-card-content>
                        <md-card-actions style="justify-content: space-around;">
                            <md-button type="submit" class="md-raised md-primary " @click="save">Save</md-button> &nbsp; &nbsp; 
                            <md-button type="submit" class="md-raised md-accent" @click="submit">Submit</md-button>
                            <md-button v-if="showButton" class="md-primary md-raised" @click="showDialog = true">Upload File</md-button>
                        </md-card-actions>

            </md-card>

        </div>

        </md-app-content>
  </md-app>
</template>

<script>
import Navbar from '@/components/dashboard/Navbar'
import Drawer from'@/components/dashboard/Drawer'
import axios from 'axios'
export default {
    name: 'NewGrievance',
    components: {
        Navbar,
        Drawer
    },
    data(){
        return{
            form:{
                title: null,
                description: null,
                //selectedFile:null,
                filename : null,
                filepath :null
            },
            showNavigation: false,
            showDialog:false,
            showButton:false,
            file_uploaded: false
        }
    },
    methods:{
        submit(){
            var self=this
            var data=self.form
            data.user_name=this.$store.getters.userName
            var config={
              headers: { Authorization: "Bearer " + this.$store.getters.bearerToken }
            }
            console.log(config)
            axios.post(process.env.VUE_APP_ROOT_API+'grievance/user/submit',data,config)
            .then((res)=>{
                console.log("Submitted "+res);
                self.showButton=true;
                console.log(res.data.info)
                self.$router.push({name:"success",params:{token:res.data.info.token}})
            })
            .catch((err)=>{
                console.log(err);
            })            
        },
        save(){
            console.log("save");
            var self=this
            var data=self.form
            data.user_name=this.$store.getters.userName
            var config={
              headers: { 
                  Authorization: "Bearer " + this.$store.getters.bearerToken
               }
            }
            axios.post(process.env.VUE_APP_ROOT_API+'grievance/user/save',data,config)
            .then((res)=>{
                console.log("saved ");
                console.log(res.data.info);              
                // alert("Successfully saved");
                self.showButton=true;
            })
            .catch((err)=>{
                console.log(err);
            })
            
        },
        onFileSelected:function(event){
                this.selectedFile = event.target.files[0]
                console.log(this.selectedFile)
            },
        uploadFile:function(){
                var self = this
                var data = {};
                var fileData = new FormData()
                fileData.append('user',this.$store.getters.userName);
                fileData.append('file',this.selectedFile,this.selectedFile.name)
                var config={
                        headers: { 
                            Authorization: "Bearer " + this.$store.getters.bearerToken,
                            'content-type':'multipart/form-data'
                            }
                        }
                console.log(config)
                axios.post(process.env.VUE_APP_ROOT_API+'grievance/user/file',fileData,config)
                .then((res)=>{
                    this.form.filename = res.data.filename;      //to get the file name and details to add to the table
                    this.form.filepath = res.data.filepath;
                    this.file_uploaded = true;
                    console.log(res.data);              
                    // alert("Successfully uploaded");
                    this.showDialog=false;
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    },
    mounted(){
        console.log("Retrieving saved grievance");
        var self = this;
        axios.get(process.env.VUE_APP_ROOT_API+'grievance/user/saved',{
            params: {
                user_name:this.$store.getters.userName
            },
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }                
        })
        .then((res) => {
            console.log(res.data.info);
            
            if(res.data.success){
                self.form.title = res.data.info.title
                self.form.description = res.data.info.description
                self.showButton=true;
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

<style lang="scss" scoped>
.md-app{
    height: inherit;
  }

.md-primary{
       background-color:   hsl(0, 0%, 11%) !important;

}
   // Demo purposes only
  .md-drawer {
    width: 400px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 16px;
  }

  .md-layout{
    padding-top: 20px;
  }

  .md-card-actions{
      padding: 10%;
  }

  .md-button{
      font-size: 12pt;
      font-weight: bold;
      text-transform: none;
        border-radius: 15px;
    width: 150px !important;
    text-align: inherit;

  }

.file{
    border-radius: 15px;
    padding: 15px;
}


  
</style>











