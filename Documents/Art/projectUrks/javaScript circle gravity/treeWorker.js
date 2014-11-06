self.addEventListener('message', function(e) {
    //if (e.data.state === "tree") {
        console.log(e.data);
        self.postMessage(e.data);
   // }
}, false);