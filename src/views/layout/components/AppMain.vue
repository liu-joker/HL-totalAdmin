<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      // console.log('cachedViews',this.$store.state.tagsView)
      return this.$store.state.tagsView.cachedViews
    },
     key() {
      //  console.log('key', this.$route.fullPath)
       return this.$route.fullPath
     }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
  padding:20px;
}
</style>
