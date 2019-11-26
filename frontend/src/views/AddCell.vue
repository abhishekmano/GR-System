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
                    <div class="md-title" style="font-weight: bold; font-size: 20pt;">Cell Member Details</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter md-alignment-center-center">
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="cellid">Cell ID</label>
                                <md-input class="cellid" name="cellid" id="cellid" />
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-70 md-small-size-100">
                            <md-field>
                                <label for="username">Username</label>
                                <md-input class="username" name="username" id="username" />
                            </md-field>
                        </div>
                    </div>
                    <span>------baaki details entha vende nnu vecha addikko------</span>
                </md-card-content>
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
    }

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