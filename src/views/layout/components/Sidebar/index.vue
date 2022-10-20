<template>
  <el-scrollbar wrapClass="scrollbar-wrapper" >
   <!-- <div class="OEMlogo">
      <div class="oemName">
        <p>{{name}}</p>
        <p>{{companyname}}</p>
      </div>
    </div>-->

    <el-menu 
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      width='500px'
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path" ></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<style rel="stylesheet/scss" lang="scss" >
  .OEMlogo {
    height: 100px;
    background-color: rgb(48, 65, 86);
    color: #ffffff;
    font-size: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    p{
      display: inline-block;
      width: 100%;
      margin: 5px 0;
      padding: 0;
    }
   


    
  }
  
</style>
<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      routes() {
      
        return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    data(){
      return {
        name:this.$store.getters.oemName,
        companyname:this.$store.getters.companyname,
      }
    },
    created() {
     // console.log('这里')
      //console.log(permission_routers)
      //console.log('结束')
      //console.log(mapGetters.get('sidebar'))
      console.log('this.$router.options.routes',this.$router.options.routes,this.permission_routers)

    }
  }
</script>
