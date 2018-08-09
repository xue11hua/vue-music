<template>
    <div class="lunbo">
        <div class="swiper">
            <swiper :options="swiperOption"  ref="mySwiper">
			<!-- 这部分放你要渲染的那些内容 -->
			<swiper-slide v-for="(item,index) in items" :key='index'>
                <img width="100%" v-lazy="item.picUrl" alt="">
			</swiper-slide>
			<!-- 这是轮播的小圆点 -->
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- 这是轮播的上一页下一页 -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
		</swiper>
        </div>
		
	</div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import http from "@/utils/http";
import api from "@/utils/api";
export default {
  name: "lunbo",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true, // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        autoplay: true,
        // loop: true,
        direction: "horizontal",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination"
        },
        centeredSlides: true,
        paginationClickable: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: true,
        mousewheelControl: true,
        observeParents: true, // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
      },
      items: []
    };
  },

  methods: {
    fetchData: async function() {
      let params = {};
      const res = await http.get(api.banner, params);
      if (res.data.code == 200) {
        this.items = res.data.banners;
      }
      console.log(res);
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.lunbo {
  width: 96%;
  margin: 0 auto;
 
}
</style>


