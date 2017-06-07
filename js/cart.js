new Vue({
  el: '#app',
  data: {
      totalMoney: 0,
      productList: [],
      delFlag:false,
      checkAllFlag: false
    // delFlag: false,
    // curProduct: ''
    // checkAllFlag:false
  },
  filters: {
      formatMoney:function (value) {
          return "￥"+value.toFixed(2)
      }
  },
  mounted: function() {
      this.$nextTick(function () {
          this.cartView()
      })
    // this.$nextTick(function() {
    //   this.cartView();
    // })
  },
  methods: {
      //调用json数据
      cartView: function() {
        var _this = this;
        this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {
          _this.productList = res.body.result.list;
        });
      },
      //更改产品数量的价格改变
      changeMoney: function (product,way) {
          if(way>0){
              product.productQuantity++;
          } else{
              if(product.productQuantity<=1){
                  product.productQuantity=1;
              }
              else{
                  product.productQuantity--;
              }
          }
          this.calTotalMoney()
      },
      //选中产品前的按钮
      selectProduct:function (item) {
          if(typeof item.checked=='undefined'){
              Vue.set(item,'checked',true);
              // this.$set(item,'checked','true');
          } else{
              item.checked=!item.checked;
          }
          this.calTotalMoney();
      },
      //全选与取消全选
      checkAll:function (flag) {
          //实现全选按钮的toggle功能
          this.checkAllFlag=flag;
          //实现产品的全选
          var _this=this
          this.productList.forEach(function (item,index) {
              if(typeof item.checked=='undefined'){
                  Vue.set(item,'checked',_this.checkAllFlag);
                  // this.$set(item,'checked','true');
              } else{
                  item.checked=flag;
              }
          })
          this.calTotalMoney();
      },
      calTotalMoney:function () {
          var _this=this;
          this.totalMoney=0;
          // alert("kk")
          this.productList.forEach(function (item,index) {
             if(item.checked){
                 _this.totalMoney+=item.productPrice*item.productQuantity;
             }

          });
      },
      delConfirm:function (item) {
          this.delFlag=true;
          this.curProduct=item;
      },
      delProduct:function () {
       var index=this.productList.indexOf(this.curProduct);
       this.productList.splice(index,1);
       this.delFlag=false;
      }
    }
});
Vue.filter("money",function (value,type) {
    return "￥"+value.toFixed(2)+type
})
