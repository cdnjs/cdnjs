Array.prototype.average=function(){
    var sum=0;
    var j=0;
    for(var i=0;i&lt;this.length;i++){
        if(isFinite(this[i])){
          sum=sum+parseFloat(this[i]);
           j++;
        }
    }
    if(j===0){
        return 0;
    }else{
        return sum/j;
    }
}
 
Array.prototype.stddev=function(){
    var n = 0;
    var sum = 0.0;
    var sum_sq = 0.0;
    for(var i=0;i&lt;this.length;i++){
        n++;
        sum += this[i];
        sum_sq += this[i]*this[i];
    }
    return Math.sqrt( (sum_sq /n) - Math.pow(sum /n, 2));    
}
 
Array.prototype.median=function(){
    var median = 0,
        sorted = [],
        numsLen = this.length;
    sorted = this.slice();
    sorted.sort();
    if (numsLen % 2 === 0) { 
        median = (sorted[numsLen / 2 - 1] + sorted[numsLen / 2]) / 2;
    } else { 
        median = sorted[(numsLen - 1) / 2];
    }
    return median;
}
 
Array.prototype.mode=function(){
	//it returns an array. If modal it has only 1 element
	// if multimodal it has n elements
    var modes = [],
        count = [],
        i,
        number,
        maxIndex = 0; 
    for (i = 0; i &lt; this.length; i += 1) {                                   
        number = this[i];                                                    
        count[number] = (count[number] || 0) + 1;                                    
        if (count[number] &gt; maxIndex) {
          maxIndex = count[number];
        }
    }
    for (i in count) if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
            modes.push(Number(i));
        }
    }
    return modes;
}
 
Array.prototype.average_t=function(){
    var sum=0;
    var j=0;
    var average_t = [];
    for(var i=0;i&lt;this.length;i++){
        if(isFinite(this[i])){
          sum=sum+parseFloat(this[i]);
          j++;
          average_t[i] = sum/j
        }
    }
    if(j===0){
        return 0;
    }else{
        return average_t;
    }
}
