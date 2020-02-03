<template>
  <div class="home">
      <h1 class="header">音乐搜索</h1>
      <hr> 
      <div class="count">
         <el-input  placeholder="请输入歌手或者歌曲名" v-model="input"  clearable  class="input"></el-input>
         <el-button type="primary" icon="el-icon-search" @click="soso"   :disabled="!this.input">搜索</el-button>
      </div>
      <hr>
      <div class="infinite-list-wrapper">
        <el-table :data="tableData" class="table"  border    
         v-infinite-scroll="load"
         infinite-scroll-distance="10"
        infinite-scroll-disabled="disabled" 
        style="overflow:auto">  
            <el-table-column   width="50"   label="序号" resizable   align="center"  >
                  <template slot-scope="scope">{{(scope.$index+1)}} </template>
            </el-table-column>
            <el-table-column prop="songname" label="音乐名称" resizable    show-overflow-tooltip></el-table-column>
            <el-table-column prop="singer[0].name" label="作者" resizable></el-table-column>
            <el-table-column prop="albumname" label="专辑" resizable></el-table-column>
            <el-table-column prop="interval" label="音乐时长" resizable   :formatter="interval"></el-table-column> 
             <el-table-column  label="播放"   align="center"  width="130px" > 
                <template slot-scope="scope"  style="width:100%;text-align:center">
                     <el-button type="primary"    icon="el-icon-video-play" @click="play(scope.$index)"  size="medium">播放</el-button>
                </template>
            </el-table-column > 
        </el-table>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
     
      <!-- <div class="table" v-infinite-scroll="load" style="overflow:auto">
        <tr v-for="(i,t) in tableData" :key="t"  style="border:1px blue solid;">
          <td>{{t+1}}</td><td>{{ i.songname}}</td><td>{{ i.singer[0].name}}</td><td>{{ i.albumname}}</td><td>时长</td><td>播放</td>
        </tr>
          <tr  v-show="ss">
          <td colspan="5"> 正在加载!</td>
        </tr>
      </div> -->
      <hr>
      <br><br><br><br><br>
  </div>
</template>

<script>
export default {
  name: 'home',
  components:{
  },

  data() {
      return {
        loading: false,
        totalnum:0,
        show:false,
        isshow:false,
        curnum:0,
        input: '',
        page:1,
        n:20,
        tableData: []
      }
    },
     mounted() {
  },
   computed: {
      noMore () {
        return this.curnum <this.n
      },
      disabled () {
        return this.loading || this.noMore
      }
  },
    methods:{
      //音乐时长
       interval(row, column, cellValue){
         if(cellValue){
           return  Math.floor(cellValue/60).toString().padStart(2,"0")+":"+(cellValue-(Math.floor(cellValue/60))*60).toString().padStart(2,"0");   
         }else{
           return '暂无时长'
         }
      },

      //发行时间
      pubtime(row, column, cellValue,index){
        if(cellValue){
           return new Date(cellValue*1000).toLocaleDateString();
         }else{
           return '暂无发行时间'
         }
      },

      
      //播放
      play(i){
          this.show=false;
          this.$axios.get('http://127.0.0.1:3000/musicu',{
           params:{
           "songmid":this.tableData[i].songmid,
           }
        }).then( (res) =>{
        this.n=i
        this.imgs(i);
        this.lyric(i);
        this.tableData[i].musicUrl=res.data.req_0.data.sip[0]+res.data.req_0.data.midurlinfo[0].purl; 
        console.log(this.tableData[i].musicUrl)
     setTimeout( ()=>{     
       this.show=true;
     },800);
        
        }).catch ((err) => {
         console.log('失败',err);
        
        })
        
        

           
      },

      //加载歌手图片
      imgs(i){
         this.$axios.get('http://127.0.0.1:3000/img',{
           params:{
            "albumMid":this.tableData[i].albummid,
            "time":new Date().getTime(),
           }
        }).then( (res) =>{
            // if(res.data.result.artists[0].picUrl ||res.data.result.artists[0].img1v1Url){
            // this.tableData[i].imgUrl=res.data.result.artists[0].picUrl || res.data.result.artists[0].img1v1Url
            // }
            console.log(res)
        }).catch ((err) => {
         console.log('失败',err)
        })
      },

      lyric(i){
          this.$axios.get('http://127.0.0.1:3000/lyric',{
           params:{
            "songmid":this.tableData[i].songmid,
             "time":new Date().getTime(),
           }
        }).then( (res) =>{
            this.tableData[i].lyric=res.data.lyric;
            console.log(this.tableData[i])
        }).catch ((err) => {
         console.log('失败',err)
        })
      },


      //搜索
      soso(){
          this.page=1;
          this.tableData=[];
          this.totalnum=0;
          this.go();
      },

      //加载
      go(){  //搜索中,加载状态出现
        this.$axios.get('http://127.0.0.1:3000/proxy',{
          params:{
          'p':this.page,
          'n':this.n,
          'w':this.input,
          }
        }).then( (res) =>{
          this.curnum=res.data.data.song.curnum;
          for(let i=0;i<this.curnum;i++){
                this.tableData.push(res.data.data.song.list[i])
             } 
          this.loading = false
        }).catch ((err) => {
         console.log('失败',err)
        })
      },
      load (){
       this.loading = true,
       this.page+=1;
       console.log("444")
      setTimeout(() =>{
      this.go();
       },1000)
      }
   
    }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
  border: 1px red solid;
}
.header{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.table{
  width: 100%;
  height: 500px;
}
.infinite-list-wrapper{
 text-align: center
}

@media screen and (max-width: 1920px) {
.count{
  display: flex;
  justify-content: center;
  width:80%;
  margin: 2% auto;
}
.count .input{
 width:100%;
 min-width: 200px;
 margin-right: 2%;
}
}

</style>

