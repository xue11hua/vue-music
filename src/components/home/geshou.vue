<template>
    <div class="geshou">
        <div class="wrapper" ref="wrapper">

       <div class="content">

      
       <ul  class="geshou_list">
           <li v-for="group in singers" class="list-group" :key="group.id" ref="listGroup">
                <h2 class="list-group-title">{{ group.title }}</h2>
                <ul>
                <li v-for="item in group.items" class="list-group-item" :key="item.id">
                    <img v-lazy="item.avatar" class="avatar">
                    <span class="name">{{ item.name }}</span>
                </li>
                </ul>
            </li>
       </ul>
        </div>
        </div>
       <div class="geshou_index">
           <ul >
               <li v-for="(group,index) in singers" :key='group.id'  :data-index="index"  @touchmove.stop.prevent="onShortcutMove" @touchstart="onShortcutStart" :class="isindex==index?'isclass':''">{{ group.title }}</li>
           </ul>
       </div>
    </div>
</template>
<script>
import http from "@/utils/http";
import api from "@/utils/api";
import BScroll from "better-scroll";
import geshoudata from "@/components/geshoudata/geshou.js";
export default {
  name: "geshou",
  data() {
    return {
      options: {
        probeType: 3,
        click: true
      },
      touch: {
        y1: "",
        y2: "",
        anchorIndex: ""
      },
      isindex: 0,
      scrollY: "",
      listHeight: "",
      singers:'',
    };
  },
  methods: {
    fetchData: async function() {
      let params = {};
      const res = await http.get(api.artists, params);
      if (res.data.code == 200) {
        // this.items = res.data.banners;
      }
      console.log(res);
    },
    onShortcutStart(e) {
      // 获取到绑定的 index
      let index = e.target.getAttribute("data-index");
      this.isindex = index;
      // 使用 better-scroll 的 scrollToElement 方法实现跳转
      this.scroll.scrollToElement(this.$refs.listGroup[index]);
      // 记录一下点击时候的 Y坐标 和 index
      let firstTouch = e.touches[0].pageY;
      this.touch.y1 = firstTouch;
      this.touch.anchorIndex = index;
    },
    //计算列表的高度来判断高亮
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
      console.log(this.listHeight);
    },
    onShortcutMove(e) {
      // 再记录一下移动时候的 Y坐标，然后计算出移动了几个索引
      let touchMove = e.touches[0].pageY;
      this.touch.y2 = touchMove;
      // 这里的 18 是索引元素的高度
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18);
      // 计算最后的位置
      // * 1 是因为 this.touch.anchorIndex 是字符串，用 * 1 偷懒的转化一下
      let index = this.touch.anchorIndex * 1 + delta;
      if (index < 0) {
        index = 0;
      } else if (index > 22) {
        index = 22;
      }
      this.isindex = index;
      this.scroll.scrollToElement(this.$refs.listGroup[index]);
    }
  },
  mounted() {
    this.fetchData();
    this._calculateHeight();
  },
  created() {
      this.singers=geshoudata;
      console.log(this.singers);
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, this.options);
      this.scroll.on("scroll", pos => {
        this.scrollY = pos.y;
      });
    });
  },
  watch: {
    //滚动列表判断高亮
    scrollY(newVal) {
      if (newVal > 0) {
        this.isindex = 0;
        return;
      }
      for (var i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (-newVal >= height1 && -newVal < height2) {
          this.isindex = i;
          return;
        }
      }
      this.isindex = this.listHeight.length;
    }
  }
};
</script>
<style lang="scss" scoped>
.geshou {
  position: fixed;
  top: 88px;
  width: 100%;
  height: 100%;
}
.geshou_index {
  position: absolute;
  z-index: 111;
  width: 20px;
  right: 0px;
  top: 40px;
  text-align: center;
  li {
    padding: 2px;
    font-size: 12px;
  }
}
.geshou_list {
  .list-group-title {
    font-size: 14px;
    background: rgba($color: #000000, $alpha: 0.1);
    padding-left: 12px;
    color: #fff;
  }
  .list-group-item {
    display: flex;
    margin: 5px;
    padding: 5px;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      flex: 1;
      margin-left: 10px;
    }
  }
}
.isclass {
  color: red;
}
</style>


