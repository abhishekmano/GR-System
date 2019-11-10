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

</style>