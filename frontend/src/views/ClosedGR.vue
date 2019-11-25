<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav='showNavigation = !showNavigation'/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer/>
        </md-app-drawer>
        <md-app-content class="table">
            <md-table v-model="data" md-card class="content">
                <md-table-toolbar>
                    <md-table-toolbar>
                        <h1 class="md-title" style="font-size: 20pt; font-weight: bold;">Resolved Grievances</h1>
                    </md-table-toolbar>
                </md-table-toolbar>
                 <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Sl no" md-numeric>{{item.id}}</md-table-cell>
                    <md-table-cell md-label="Title">{{item.title}}</md-table-cell>
                    <md-table-cell md-label="Status">{{item.status}}</md-table-cell>
                    <md-table-cell md-label="Resolved on">{{ item.resolve_date }}</md-table-cell>
                    <md-table-cell md-label="Remark">{{item.remark}}</md-table-cell>                    
                </md-table-row>
            </md-table>
        </md-app-content>
    </md-app>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
export default {
    name: 'ClosedGR',
    components:{
        Navbar,
        Drawer
    },
    data:function(){
        return {
            showNavigation: false,
            data: null
        }
    },
    mounted(){
        var self = this
        
        axios.get(process.env.VUE_APP_ROOT_API+'grievance/user/closed',{
            params: {
                user_name:this.$store.getters.userName
            },
            headers: { 
                Authorization: "Bearer " + this.$store.getters.bearerToken 
            }                
        })
        .then((res) => {
            console.log(res.data);
            if(res.data.success){
                self.data = res.data.info
            }
            else{
                console.log("ERR "+res.data.error)
            }
        })
        .catch((err) => {
            console.log("ERR "+err);
            
        })
    }


}
</script>

<style lang="scss" scoped>
.md-app{
    height: inherit;
  }

   // Demo purposes only
 .md-drawer {
    width: 400px;
    max-width: calc(100vw - 125px);
    color: antiquewhite;
  }

  .md-primary{
        background-color:   hsl(0, 0%, 11%) !important;
  }
  .md-content {
    padding: 16px;
  }

.md-table-cell{
    text-align: left;
}

.table{
    padding-top: 120px;
    width: 700px;
}
.content{
    border-radius: 15px;
    left: 55%;
    padding: 18px;
}

</style>
