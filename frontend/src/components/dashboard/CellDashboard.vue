<template>
    <div style="padding: 50px;">
        <div class="md-layout md-gutter md-alignment-top-center">
          <a @click="route('pending')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title" style="font-size: 15pt;">Pending Grievances</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-2x" style="color: rgb(255, 100, 100);">info</md-icon>
                </md-card-content>
              </md-ripple>
            </md-card>
          </a>
          <a @click="route('accepted')">
            <md-card md-with-hover>
              <md-ripple>
                <md-card-header>
                  <div class="md-title" style="font-size: 15pt;">Accepted Grievances</div>
                </md-card-header>

                <md-card-content>
                  <md-icon class="md-size-2x" style="color: green;">check_circle_outline</md-icon>
                </md-card-content>
                
              </md-ripple>
            </md-card>
          </a>
        </div>   

        <div>
           <md-dialog :md-active.sync="showDialog" style="padding: 20px; border-radius: 15px;"> 
                <md-field>
                  <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates">
                    <label>Select month and year</label>
                  </md-datepicker>
                </md-field>
                <md-dialog-actions>
                   <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                   <md-button class="md-primary md-raised" @click="printReport">Print</md-button>
                </md-dialog-actions>
             </md-dialog>  
         </div> 


         <div style="padding: 50px; position: relative">
           <md-button class="md-primary md-raised " @click="showDialog = true">Print Report</md-button>
          </div>  
    </div>
    
</template>

<script>
import axios from 'axios'
export default {
    name:"CellDashboard",
    data(){
      return{
        showDialog:false,
        selectedDate: new Date('2019/01/01'),
        disabledDates: date => {
          const day = date.getDate()

          return day >1 
        }
      }
    },
    methods:{
			newGr(){
			this.$router.push('createGR')
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
      printReport:function(){
        console.log("printing report");         
        var self = this
        var data = {
            "selectedDate":this.selectedDate
        }
        // console.log(data);
        var config = {
            headers:{
                Authorization: "Bearer " + this.$store.getters.bearerToken,
                'Accept': 'application/pdf' 
            },
            responseType: "blob"
        }
        axios.post(process.env.VUE_APP_ROOT_API+'grievance/cell/print/report',data,config)
        .then((response) => {
            this.showDialog=false;
            console.log("yoyo")
            console.log(response)
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const objectUrl = window.URL.createObjectURL(blob)
            window.open(objectUrl)
            
        })
        .catch((err) => {
            console.log("hellooooooo");
            // console.log(err);
            
        })
      }
      	
    }
}
</script>

<style lang="scss" scoped>

 .md-primary{
   background-color:  hsl(0, 0%, 11%) !important;

.md-button .md-theme-default{
    color: white !important;
}
 } 

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    border-radius: 15px;
  }

     // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-content {
    padding: 16px;
  }

  .md-layout{
    padding-top: 16px;
  }
  
  .md-button {
    text-transform: none;
    height: 40px !important;
    width: 150px !important;
    border-radius: 10px;
    // padding-left: 2%;
    // padding-right: 2%;
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
  transition: transform 0.6s ease-in-out;
}

.md-button:hover {
  cursor: pointer;
  color:white !important;
}

.md-button:hover::before {
    content: '';
   transform: translate3d(50%, -50%, 0) scale3d(30, 30, 30);
}

.md-button.md-theme-default.md-primary {
    color: white !important;
}

</style>
