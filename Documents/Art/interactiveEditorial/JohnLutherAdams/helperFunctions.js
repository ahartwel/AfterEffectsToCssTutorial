
        function dist(x1, y1, x2, y2) {

            var dx = Math.abs(x1 - x2);
            var dy = Math.abs(y1 - y2);

            var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            return d;

        }
      
       
        
        
         function radians(degrees) {
            return degrees * Math.PI / 180;
        };

        function degrees(radians) {
            return radians * 180 / Math.PI;
        };
    
        
        
        function lerp(a, b, t) {
            var x = a + t * (b - a);
            return x;
        }
        

        function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

function rnd_snd() {
	return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}