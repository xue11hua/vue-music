<template>
    <div class="header">
        <h1 class="text">VMUSICJIN</h1>
        <div class="meue">
            <i class="iconfont">&#xe63d;</i>
        </div>
        <div class="search">
            <i class="iconfont">&#xe7d4;</i>
        </div>
    </div>
</template>
<script>
export default {
    name:'myheader',
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
    .header{
        width: 100%;
        height: 44px;
        position: relative;
        background: $color-header;
        color: $color-h-text;
        .text{
            width: 100%;
            height: 44px;
            line-height: 44px;
            font-size: 16px;
           text-align: center;
        }
        .meue{
            position: absolute;
            width: 44px;
            height: 44px;
            left: 0px;
            top: 0px;
            line-height: 44px;
            text-align: center;
            i{
                font-size: 20px
            }
        }
        .search{
            position: absolute;
            right: 0px;
            top: 0px;
            width: 44px;
            height: 44px;
            line-height: 44px;
            text-align: center;
             i{
                font-size: 20px
            }
        }
    }
</style>


