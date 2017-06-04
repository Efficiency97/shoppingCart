new Vue({
  el: '#app',
  data: {
    totalMoney: 0,
    productList: [],
    // checkAllFlag: false,
    // delFlag: false,
    // curProduct: ''
    //   checkAllFlag:false
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
      cartView: function() {
        var _this = this;
        this.$http.get("data/cartData.json", {"id": 123}).then(function(res) {
          _this.productList = res.body.result.list;
          _this.totalMoney =  res.body.result.totalMoney;
        });
      },
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
      },
      selectProduct:function (item) {
          if(typeof item.checked=='undefined'){
              Vue.set(item,'checked',true);
              // this.$set(item,'checked','true');
          } else{
              item.checked=!item.checked;
          }
      },
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
      }
      // changeMoney: function(product, way) {
      //   if (way > 0) {
      //     product.productQuantity++;
      //   }
      //   else {
      //     product.productQuantity--;
      //     if (product.productQuantity < 1) {
      //       product.productQuantity = 1;
      //     }
      //   }
      //   this.calcTotalPrice();
      //
      // },
      // selectedProduct: function(item) {
      //   if (typeof item.checked == 'undefined') {
      //     // Vue.set(item, "checked", true);
      //     this.$set(item, "checked", true);
      //   }
      //   else {
      //     item.checked = !item.checked;
      //   }
      //   this.calcTotalPrice();
      // },
      // checkAll: function(flag) {
      //   this.checkAllFlag = flag;
      //   var _this = this;
      //   this.productList.forEach(function (item, index) {
      //     if (typeof item.checked == 'undefined', _this.checkAllFlag) {
      //       _this.$set(item, "checked", _this.checkAllFlag);
      //     }
      //     else {
      //       item.checked = _this.checkAllFlag;
      //     }
      //   });
      //   this.calcTotalPrice();
      // },
      // calcTotalPrice: function() {
      //   var _this = this;
      //   this.totalMoney = 0;
      //   this.productList.forEach(function(item, index) {
      //     if (item.checked) {
      //       _this.totalMoney += item.productPrice * item.productQuantity;
      //     }
      //   });
      // },
      // delConfirm: function(item) {
      //   this.delFlag = true;
      //   this.curProduct = item;
      // },
      // delProduct: function() {
      //   var index = this.productList.indexOf(this.curProduct);
      //   this.productList.splice(index, 1);
      //   this.delFlag = false;
      // }
    }
});
// // 全局过滤器
// Vue.filter('money', function(value, type) {
//   return "¥" + value.toFixed(2) + type;
// })
Vue.filter("money",function (value,type) {
    return "￥"+value.toFixed(2)+type
})
