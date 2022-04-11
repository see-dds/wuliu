<template>
  <d2-container>
      <div
    class="amap-page-container"
    style=" height: 400px; margin-bottom: 200px; background: #ccc"
  >
    <el-amap-search-box
      class="search-box"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      :plugin="plugin"
      :events="events"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :position="marker"
        :key="'marker' + index"
      ></el-amap-marker>
    </el-amap>
    <div class="toolbar" v-if="loaded">
      <div
        style="font-size:15px;margin:10px 0px 10px 10px; border-bottom: 1px solid #e6e6e6;"
      >
        定位地址: {{ address }}
      </div>
    </div>
    <div v-else>正在定位</div>
    <div class="addressList">
      <div
        class="item"
        v-for="(item, index) in addressList"
        :key="index"
        @click="sendMapMsg(item)"
      >
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="address">{{ item.address }}</div>
        </div>
      </div>
    </div>
  </div>
</d2-container>
</template>

<script>
export default {
  data: function () {
    const self = this

    return {
      markers: [],
      searchOption: {
        city: '全国',
        citylimit: false
      },
      zoom: 12,
      loaded: false,
      center: [121.59996, 31.197646],
      plugin: [
        {
          pName: 'Geolocation',
          // 是否使用高精度定位，默认true
          enableHighAccuracy: true,
          // // 超过10秒后停止定位，默认：无穷大
          // timeout: 10000,
          // // 自动偏移后的坐标为高德坐标，默认：true
          convert: true,
          // // 显示定位按钮，默认：true
          showButton: true,
          // // 定位按钮停靠位置，默认'LB'，左下角
          buttonPosition: 'RB',
          // // 定位成功后在定位到的位置显示标记，默认：true
          showMarker: true,
          // 定位成功后用圆圈表示定位精度范围，默认：true
          showCircle: true,
          // // 定位成功后将定位到的位置作为地图中心点，默认true
          panToLocation: true,
          // // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          events: {
            init (o) {
              console.log('o高德插件初始化成功')
              const addressInfo =
                JSON.parse(sessionStorage.getItem('addressInfo')) || {}
              console.log('这是地址信息', addressInfo)
              var placeSearch = new AMap.PlaceSearch()
              if (addressInfo.name && addressInfo.lng && addressInfo.lat) {
                console.log('已有位置信息')
                self.lng = addressInfo.lng
                self.lat = addressInfo.lat
                self.center = [addressInfo.lng, addressInfo.lat]
                self.address = addressInfo.address

                console.log(addressInfo.name)
                placeSearch.search(addressInfo.name, function (status, result) {
                  console.log('定位结果')
                  console.log(result)
                  if (result.poiList.pois.length >= 1) {
                    self.addressList = result.poiList.pois
                    self.selectedAddress = addressInfo

                    console.log('地址列表', self.addressList)
                    console.log('当前地址', self.selectedAddress)
                    const isSelectIndex = self.addressList.findIndex(
                      i => i.id === self.selectedAddress.id
                    )
                    console.log('==')
                    console.log(isSelectIndex)
                    if (isSelectIndex !== -1) {
                      self.addressList[isSelectIndex].selected = true
                    } else {
                      self.addressList[0].selected = true
                    }
                    self.loaded = true
                    self.$nextTick()
                  } else {
                    self.loaded = true
                  }
                })
              } else {
                // o 是高德地图定位插件实例

                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    console.log('获取当前位置信息')
                    console.log(result)
                    self.lng = result.position.lng
                    self.lat = result.position.lat
                    self.center = [self.lng, self.lat]
                    // 定位地址

                    self.address = result.formattedAddress
                    console.log(result, '000')

                    placeSearch.search(self.address, function (
                      status,
                      resultTemp
                    ) {
                      console.log(resultTemp)
                      if (resultTemp.poiList.pois.length >= 1) {
                        console.log('获取定位地址附近列表')
                        console.log(resultTemp)
                        self.addressList = resultTemp.poiList.pois
                      }
                    })

                    //  为什么要加这一行  没有地址的时候 拿当前定位  但不显示列表
                    //  列表是要通过 地址名的 formattedAddress
                    // self.addressList=self.addressList.concat(obj1)

                    self.loaded = true
                    self.$nextTick()
                  } else {
                    self.loaded = true
                  }
                })
              }
            }
          }
        }
      ],

      address: '',
      events: {
        click (e) {
          console.log(e)
          console.log('点击的地址', self.address)
          console.log('这是点击事件集合', self)
          const { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat

          // 这里通过高德 SDK 完成。
          //   var geocoder = new AMap.Geocoder({
          //     radius: 1000,
          //     extensions: 'all'
          //   });

          let geocoder
          AMap.plugin('AMap.Geocoder', function () {
            geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: 'all'
            })
          })

          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.name = result.regeocode.addressComponent.city

                self.$nextTick()
              }
            }
          })
        }
      },
      lng: 0,
      lat: 0,
      addressList: [],
      selectedAddress: {}
    }
  },
  methods: {
    sendMapMsg (e) {
      this.$emit('func', e)
    },
    handleSelectedAddress (e) {
      this.selectedAddress = e
      console.log(this.selectedAddress)
      const addressInfo = {
        ...e,
        lng: e.location.lng,
        lat: e.location.lat
      }
      sessionStorage.setItem('addressInfo', JSON.stringify(addressInfo))
      // this.$router.go(-1);
    },
    addMarker: function () {
      const lng = 121.5 + Math.round(Math.random() * 1000) / 10000
      const lat = 31.197646 + Math.round(Math.random() * 500) / 10000
      this.markers.push([lng, lat])
    },
    onSearchResult (pois) {
      console.log('搜索结果', pois)
      this.addressList = pois
      this.address = this.addressList.address
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          const { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        const mapcenter = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.center = [mapcenter.lng, mapcenter.lat]
      }
    }
  },
  watch: {
    address: {
      handler: function (val, oldVal) {
        this.address = val
        this.$emit('sendAddress', this.address)
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>
<style scoped>
.search-box{
width: 300px;
}
</style>
