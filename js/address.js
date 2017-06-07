new Vue({
   el:'.container' ,
   //data中有所有vue'的模型，通过模型操作页面元素、Dom
   data:{
       limitNum:3,
       addressList:[],
       currentIndex: 0,
       shippingMethod:1
   },
   mounted:function () {
    this.$nextTick(function () {
        this.getAddressList();
    })
   },
    computed:{
      filterAddressList:function () {
          return this.addressList.slice(0,this.limitNum);
      }
    },
    //定义所有事件以及我们要调用的方法
    methods:{
      getAddressList:function () {
          var _this=this;
          this.$http.get('data/address.json').then(function (response) {
              var res=response.data;
              if(res.status ='0'){
                _this.addressList=res.result;
              }
          })
      },
      loadMore:function () {
          var _this=this;
          if(this.limitNum==3){
              _this.limitNum=_this.addressList.length;
          }
      },
      setDefault:function (addressId) {
          this.addressList.forEach(function (address,index) {
              if(address.addressId==addressId){
                  address.isDefault=true;
              }else{
                  address.isDefault=false;
              }
          })
      }
    }
});