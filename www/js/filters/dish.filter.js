/*global app */
'use strict';
app.filter('filterDish', function () {
  return function (items, cat) {
    
    var filtered = [];
    if(typeof cat === 'undefined' || cat.length < 1){
      filtered = items;
    }
    else{
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var flag = true;
        
        for(var j = 0; j < cat.length; j++){
          // if(item.PRA_CategoriaPrato.length > 1){
          //   for(var k = 0; k < item.categories.length; k++){
          //     if(flag && item.categories[k].id === cat[j]){
          //       filtered.push(item);
          //       flag = false;
          //       break;
          //     }
          //   }
          // }else{
            if(flag && item.PRA_CategoriaPrato === cat[j]){
              filtered.push(item);
              flag = false;
              break;
            }
          // }
        }
      }
    }
    return filtered;
  };
});
app.filter("mydate", function() {
    var re = /\/Date\(([0-9]*)\)\//;
    return function(x) {
        var m = x.match(re);
        if( m ) return new Date(parseInt(m[1]));
        else return null;
    };
});
app.filter('commaToDecimal', function(){
    return function(value) {
        return value ? parseFloat(value).toFixed(2).toString().replace('.', ',') : null;
    };
});