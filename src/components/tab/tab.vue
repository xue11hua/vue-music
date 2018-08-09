<template>
    <div class="tab">
        <router-link to="/" class="item_span">
            <span>推荐</span>
        </router-link>
        <router-link to="/paihang" class="item_span">
            <span>排行</span>
        </router-link>
        <router-link to="/geshou" class="item_span">
            <span>歌手</span>
        </router-link>
        
    </div>
</template>
<script>
export default {
    name:'tab',
    data(){
        return{

      }
    },
    
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
    .tab{
        width: 100%;
        height: 44px;
        line-height: 44px;
        display: -webkit-flex;
        background: $color-header;
        .item_span{
            flex-grow: 1;
            text-align: center;
            display: block;
            color: $color-h-text;
        }
    }
</style>


