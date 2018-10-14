const timeConvert = function(timestamp, val) {
  if(val){
  const dt = new Date(parseInt(timestamp));      
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes() + 1}:${dt.getSeconds()}`;
  }else{
    const dt = new Date(timestamp); 
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;  
  } 
};

module.exports = timeConvert;