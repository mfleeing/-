<template>
  <div id="plays">
      
         
  </div>
</template>

<script>
export default {
  name: 'plays',

  data() {
      return {
     
     }
  },
   methods:{
   go(){
      this.$axios.get('http://127.0.0.1:3000/magnet',{
          params:{
          'hash':"8CBB621FE70BF6E5DB81FE870EF545DE4EDEAAAD",
          }
        }).then( (res) =>{
           console.log(res);
           var ss=document.getElementById('plays').innerHTML = res.request.response;
           document.getElementById('link').value = "magnet:?xt=urn:btih:052E864EA120D18A1239237E316D373F29E68188"
           link
            // document.querySelector(".button,.menu,").style.display=none;
            //  window.location.href=ss;
            // if(document.getElementById('link').value.trim() == '') return false;document.getElementById('hash').value = document.getElementById('link').value.trim().substring(20,60);
           console.log(ss);
        }).catch ((err) => {
         console.log('失败',err)
        })
   }
     
    
  },
   mounted(){
    this.go();
    },
   created(){
    //  window.location.href="http://127.0.0.1:3000/magnet";
     },

}
</script>

<style scoped>

</style>

