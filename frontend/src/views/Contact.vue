<template>
    <md-app>
        <md-app-toolbar class="md-primary">
            <Navbar @toggleNav='showNavigation = !showNavigation'/>
        </md-app-toolbar>
        <md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
            <Drawer/>
        </md-app-drawer>
        <md-app-content>
            <div>
            <md-card>
                <md-card-header>
                    <span class="md-display-2">Contact Us</span>
                </md-card-header>
                <md-card-content >
                    <md-list>
                        <md-list-item><span class="md-headline">Greivance Cell, College of Engineering, Trivandum</span></md-list-item>
                        <md-list-item><span class="md-headline "><md-icon>call</md-icon> +91-471-1234567</span></md-list-item>
                        <md-list-item><span class="md-headline "><md-icon>email</md-icon> greivancecell@cet.ac.in</span></md-list-item>
                    </md-list>
                </md-card-content>
            </md-card>
            </div>
            <div class="loader" style="padding: 20px;">
     <div class="middle"></div>
     <div class="inner"></div>
     <div class="outer"></div>
   </div>

        </md-app-content>
    </md-app>
</template>

<script>
import Navbar from '@/components/dashboard/Navbar'
import Drawer from '@/components/dashboard/Drawer'
export default {
    name:'Contact',
    components:{
        Navbar,
        Drawer
    },
    data:function(){
        return {
            showNavigation: false,
            data: null
        }
    }
}
</script>

<style lang="scss" scoped>

.md-card{
    margin: 50px 150px !important;
}

.md-display-2{
    font-weight: bold;
    color: black; 
}

.md-headline{
     align-items: center;
    color: rgb(102, 102, 102);
}

.md-card-header{
    padding: 41px;
}

.md-primary{
    background-color: #00b73d !important;
}

.loader {
  position: relative;
}

.outer,
.middle,
.inner {
  border: 3px solid transparent;
  border-top-color: #00b73d;
  border-right-color: #00b73d;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}

.outer {
  width: 3.5em;
  height: 3.5em;
  margin-left: -1.75em;
  margin-top: -1.75em;
  animation: spin 2s linear infinite;
}

.middle {
  width: 2.1em;
  height: 2.1em;
  margin-left: -1.05em;
  margin-top: -1.05em;
  animation: spin 1.75s linear reverse infinite;
}

.inner {
  width: 0.8em;
  height: 0.8em;
  margin-left: -0.4em;
  margin-top: -0.4em;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


</style>