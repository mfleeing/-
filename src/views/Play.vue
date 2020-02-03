<template>
  <div class="play">
      　　<aplayer autoplay :music="musicList"  :showlrc="true"  > </aplayer>
  </div>
</template>

<script>

import aplayer from 'vue-aplayer'
export default {
  name: 'play',
  components: {
    aplayer: aplayer
  },
  data() {
      return {
        musicList:{
            title: this.datas.songname,
            artist: this.datas.singer[0].name,
            src:this.datas.musicUrl,
            pic: this.datas.imgUrl,
            lrc: this.datas.lyric,
        },
         
          
      }
   },
    // watch: {
    //     datas:function(val) {
    //         this.musicList = val;
    //         console.log("44")
    //     },
    // },

    props: {
       datas: {
       type: Object,
      }
    },
 

    methods:{
      list(){
       this.musicList={
            title: this.datas.songname,
            artist: this.datas.singer[0].name,
            src:this.datas.musicUrl,
            pic: this.datas.imgUrl,
            lrc: this.datas.lyric,
           }
       },
     go(){
       console.log(this.datas.musicUrl)
       console.log(this.musicList)
     }
    },

    mounted() {
     this.go()
    }

}
</script>

<style scoped>
.play{
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.527);
}
</style>

