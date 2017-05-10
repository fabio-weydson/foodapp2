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
          if(item.categories.length > 1){
            for(var k = 0; k < item.categories.length; k++){
              if(flag && item.categories[k].id === cat[j]){
                filtered.push(item);
                flag = false;
                break;
              }
            }
          }else{
            if(flag && item.categories.length && item.categories[0].id === cat[j]){
              filtered.push(item);
              flag = false;
              break;
            }
          }
        }
      }
    }
    return filtered;
  };
});