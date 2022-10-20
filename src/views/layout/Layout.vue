<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <headbar></headbar>

    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <sticky class-name="sub-navbar">
        <div>
          <navbar></navbar>
          <tags-view></tags-view>
        </div>
      </sticky>
      <app-main v-loading="$store.getters.loading"></app-main>
    </div>
  </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain, Headbar, TagsView} from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import Sticky from '@/components/Sticky'

  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      Headbar,
      TagsView,
      Sticky
    },
    mixins: [ResizeMixin],
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('CloseSideBar', {withoutAnimation: false})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
.main-container{
  // margin-left:220px!important;
 
}

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

</style>
