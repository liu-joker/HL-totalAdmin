<template>

  <div class="amap-page-container">
    <div :style="{width:'100%',height:'25rem'}">
      <el-amap
        vid="amapDemo"
        :center="center"
        :zoom="zoom"
        class="amap-demo"
        :events="events">
        <el-amap-circle-marker :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor"
                               :fill-opacity="marker.fillOpacity" :events="marker.events"></el-amap-circle-marker>
      </el-amap>
    </div>
    <div class="toolbar">
      经纬度: [{{ lng }}, {{ lat }}] 地址: {{ address }}
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Vmap',
    data() {
      const self = this;
      return {
        zoom: 12,
        center: [114.031898, 22.529931],
        lng: 0,
        lat: 0,
        address: '',
        marker: {
          center: [114.031898, 22.529931],
          radius: 7,
          fillOpacity: 1,
          fillColor: 'rgba(255,0,0,1)',
          events: {
            click: () => {
//              alert('click');
            }
          }
        },
        events: {
          click(e) {
            if (!self.mapData.edit) return false
            let {lng, lat} = e.lnglat;
            self.lng = lng;
            self.lat = lat;
//            self.center = [lng,lat]
            self.marker.center = [lng, lat]
            // 这里通过高德 SDK 完成。
            var geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.regeocode) {
                  self.address = result.regeocode.formattedAddress;
                  let data = {
                    address: self.address,
                    lng: self.lng,
                    lat: self.lat,
                    edit:true
                  }
                  self.$emit("mapFun", data)
                  self.$nextTick();
                }
              }
            });
          }
        },
      };
    },
    props: ['mapData'],
    created() {
    },
    methods: {},
  watch: {
    mapData: {
      handler:function(newVal,oldVal) {
        console.log(newVal,'newVal')
        if(this.mapData.lng !=0 && this.mapData.lat != 0){
          this.center = [this.mapData.lng, this.mapData.lat]
          this.marker.center = [this.mapData.lng, this.mapData.lat]
          this.lng = this.mapData.lng
          this.lat = this.mapData.lat
        }
        this.address = this.mapData.address
        console.log(this.mapData,this.address)
      },
      deep: true
    }
  }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

  .amap-page-container {
    .toolbar {
      padding: 1rem 0;
    }
  }

</style>
