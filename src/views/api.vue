<template>
  <div class="home">
      <h1 class="header">磁力搜索</h1>
      <div class="count">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
                 <el-select v-model="select" slot="prepend" style="width:100px">
                            <el-option label="磁力zhima998" value="磁力1"></el-option>
                            <el-option label="磁力cilixing" value="磁力2"></el-option>
                            <el-option label="磁力zooqle" value="磁力3"></el-option>
                            <el-option label="磁力tokyotosho" value="磁力4"></el-option>

                </el-select>
              <el-button slot="append" icon="el-icon-search" style="width:80px" @click="soso" :loading="isshow"  :disabled="!this.input"></el-button>
        </el-input>
      </div>
      <div id="my"  v-show="false"></div>
      <el-table :data="tableData" style="width:100%"  border  v-loading='isshow' max-height="500px" height="500px"   element-loading-text="拼命加载中">  
            <el-table-column   width="80"   label="序号" resizable   align="center" >
                  <template slot-scope="scope">{{(scope.$index+1) + page *datas-datas}} </template>
            </el-table-column>
            <el-table-column prop="name" label="磁力名称" resizable    ></el-table-column>
            <el-table-column prop="address" label="磁力链接" resizable      ></el-table-column>
            <el-table-column  label="播放/下载"   align="center"  width="190px" > 
                <template slot-scope="scope"  style="width:100%;text-align:center">
                     <el-button type="primary"    icon="el-icon-video-play" @click="play(scope)"  size="medium">播放</el-button>
                     <el-button type="primary"    @click="download(scope)" size="medium"><i class="el-icon-download"></i></el-button>
                </template>
            </el-table-column > 
        </el-table>
      <div class="menu" v-show="show">
            <el-input v-model="page"   style="width:160px;margin-right:10px">
                  <template slot="prepend">当前页</template>
            </el-input>
            <el-button type="primary" icon="el-icon-arrow-left" @click="up" :disabled="this.page==1">上一页</el-button>
            <el-button type="primary" @click="down">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button type="primary" @click="goto">跳转<i class="el-icon-arrow-right el-icon--right"></i> </el-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        select:'',
        time:5,
        input: '',
        page:1,
        show:false,
        isshow:false,
        tableData:[],
        hash:'',
        datas:0,
        names:[],
        my:''
      
     }
  },
     mounted() {
 
  },
  created(){
     this.select='磁力1'
     },
    methods:{
        download(i){
            let href=i.row.address
            window.open(href)
       }, 
        play(i){
            let href=i.row.address.split("btih:");
            this.hash=href[1];
            console.log(this.hash)
              this.$axios.get('http://www.mhweb.top:3000/magnet',{
              params:{
              'hash':this.hash,
              }
            }).then( (res) =>{
              console.log(res)
             window.open(res.request.responseURL)
            }).catch ((err) => {
           alert("获取资源失败,请联系管理员!!!!")
            })
        },
        up(){  
            this.page--;
             this.judge()
        },
        down(){
             this.page++;
             this.judge()
        },
        goto(){ 
         this.judge()
        },
       
        soso(){
         this.page=1;
         this.judge();
         },
        ti(){
             let times=setInterval ( ()=>{
                      this.time-=1;
                      console.log(this.time)
                      if(this.time==0){
                        this.$message({
                        showClose: true,
                        message: '获取资源超时,请刷新之后,重新尝试!!',
                        type: 'error',
                        center: true,
                        offset:5
                    });
                      }
                      clearInterval(times)
                      },1000) 
        },
          zhima998(){
             this.tableData=[];
             this.datas=100;
            　this.show=false;
             this.isshow=true; 
            　this.$axios.get('http://www.mhweb.top:3000/zhima998',{
                    params:{
                    'q':this.input,
                    'p':this.page,
                    }
                  }).then( (res) =>{
                 var s=document.getElementById('my').innerHTML = res.request.response;
                    var a=document.querySelectorAll(".list-group li");
                    for(var i=1;i<a.length;i++){
                        let value=a[i].innerText.split("link:")
                        this.tableData.push({
                            name:value[0],
                            address:value[1]
                        });
                      }
                    
                      this.isshow=false;   
                      this.show=true;  
                  }).catch ((err) => {
                      this.$message({
                      showClose: true,
                      message: '获取资源失败,请联系管理员或者更换其他磁力接口!!',
                      type: 'error',
                      center: true,
                      offset:5
                    });
                 this.isshow=false;   
                  })
                },
        cilixing(){
           this.tableData=[];
           this.show=false;
           this.isshow=true; 
           this.datas=10;
         this.$axios.get('http://www.mhweb.top:3000/cilixing',{
          params:{
          'q':this.input,
          'p':this.page,
          }
            }).then( (res) =>{
              var s=document.getElementById('my').innerHTML = res.request.response;
              var a=document.querySelectorAll(".layui-colla-item.fly-box h2");
              var b=document.querySelectorAll(".layui-colla-item  .layui-colla-title  .copy-btn");
              for(var j=0;j<a.length;j++){
                if(j%3==0||j==0){
                this.names.push(a[j].innerText);
                }
            }
              for(var i=0;i<b.length;i++){
                      this.tableData.push({
                      name:this.names[i],
                      address:b[i].href
                  })
                } 
              this.names=[];
              
              this.isshow=false;   
              this.show=true; 
            }).catch ((err) => {
                this.$message({
                      showClose: true,
                      message: '获取资源失败,请联系管理员或者更换其他磁力接口!!',
                      type: 'error',
                      center: true,
                      offset:5
                    });
           this.isshow=false;
            })
        },

         //磁力3
        zooqle(){
           this.tableData=[];
           this.show=false;
           this.isshow=true; 
           this.datas=30;
         this.$axios.get('http://www.mhweb.top:3000/zooqle',{
          params:{
          'q':this.input,
          'p':this.page,
          }
            }).then( (res) =>{
              var s=document.getElementById('my').innerHTML = res.request.response;
              var a=document.querySelectorAll("td.text-trunc.text-nowrap  .small");
              var b=document.querySelectorAll("ul.nav.nav-pills.nav-compact-sm.trans20.nowrap li a");
              for(var i=0;i<b.length;i++){
                  let value=b[i].href.split("&dn=%")
                  let name=a[i].innerText;
                      this.tableData.push({
                      name:name,
                      address:value[0]
                  })
                } 
                
              this.isshow=false;   
              this.show=true; 
            }).catch ((err) => {
                this.$message({
                      showClose: true,
                      message: '获取资源失败,请联系管理员或者更换其他磁力接口!!',
                      type: 'error',
                      center: true,
                      offset:5
                    });
           this.isshow=false;
            })
        },

        tokyotosho(){
         this.tableData=[];
           this.show=false;
           this.isshow=true; 
           this.datas=49;
         this.$axios.get('http://www.mhweb.top:3000/tokyotosho',{
          params:{
          'q':this.input,
          'p':this.page,
          }
            }).then( (res) =>{
              var s=document.getElementById('my').innerHTML = res.request.response;
               var a=document.querySelectorAll(".shade.category_0  .desc-top,.category_0 .desc-top");
              for(var i=0;i<a.length;i++){
                  let value=a[i].childNodes[0].href.split("&tr=")
                  let name=a[i].innerText;
                      this.tableData.push({
                      name:name,
                      address:value[0]
                  })
                } 
                
              this.isshow=false;   
              this.show=true; 
            }).catch ((err) => {
                this.$message({
                      showClose: true,
                      message: '获取资源失败,请联系管理员或者更换其他磁力接口!!',
                      type: 'error',
                      center: true,
                      offset:5
                    });
           this.isshow=false;
            })
        },
      
      //判断用户使用的磁力
       judge(){
         if(this.input==""){
           alert("请在搜索框中输入内容!")
         }else{
           switch (this.select) {
             case '磁力1':
                 this.zhima998();
                 break;
              case '磁力2':
                 this.cilixing();
                 break;
                 case '磁力3':
                 this.zooqle();
                 break;
                 case '磁力4':
                 this.tokyotosho();
                 break;
             default:
                
                 break;
          }
         }
       
       },
    }
}

</script>

<style scoped>
.home{
  width: 100%;

}
.header{
      width: 100%;
    position: relative;
    height: 70px;
    line-height: 70px;
    font-size: 2rem !important;
    font-weight: 500 !important;
    padding: 0 !important;
    margin: 0 !important;
    text-align: center;
    border-bottom: 1px black solid;
}
.menu{
    position: absolute;
    right: 2%;
    height: 60px;
    text-align: right;
    line-height: 60px;
    margin:1% 0;
}
.count{
min-width: 300px;
 width: 80%;
 margin: 2% auto;
}



</style>

