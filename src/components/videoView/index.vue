<template>

  <div class="VideoPlayer">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
    ></video-player>


  </div>

</template>

<script>

  export default {
    name: 'videoView',
    data() {
      return {
        playerOptions: {
          techOrder:['flash','html5'],
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "https://www.hlxiaoxiong.com/manage/20191022_142217.mp4" //url地址
          }],
          poster: "", //你的封面地址
          // width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    props: ['videoData'],
    created() {


      this.playerOptions.autoplay = this.videoData.autoplay
      this.playerOptions.sources = this.videoData.sources
      this.playerOptions.poster = this.videoData.poster
    },
    methods: {},
    watch: {
      videoData: {
        handler: function (newVal, oldVal) {
          console.log(this.videoData,'this.videoData')
          this.playerOptions.autoplay = this.videoData.autoplay
          this.playerOptions.sources = this.videoData.sources
          this.playerOptions.poster = this.videoData.poster
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .VideoPlayer  .video-js .vjs-big-play-button{
    /*
    播放按钮换成圆形
    */
    height: 2em;
    width: 2em;
    /*font-size: 2.5em !important;*/
    line-height: 2em;
    border-radius: 1em;
    margin-left: 0 !important;
    transform: translate(-50%,0);
  }


</style>
