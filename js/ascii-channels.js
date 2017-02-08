
var channels = {

    asciiContainer: document.getElementById("ascii"),
    capturing: false,
    init: function(){

        camera.init({

            width: 160,
            height: 120,
            fps: 30,
            mirror: true,

            onFrame: function(canvas) {

                condole.log('here');

                ascii.fromCanvas(canvas, {
                    // contrast: 128,
                    callback: function(asciiString) {
                        this.asciiContainer.innerHTML = asciiString;
                    }
                });
            },

            onSuccess: function() {

                camera.start();

                // console.log(this.capturing.bind(this));

                // document.getElementById("info").style.display = "none";

                // capturing = true;
                // document.getElementById("pause").style.display = "block";
                // document.getElementById("pause").onclick = function() {

                    // if (this.capturing) {
                    //     this.camera.pause();
                    // } else {
                    //     this.camera.start();
                    // }
                    // this.capturing = !this.capturing;
                // };
            },

            onError: function(error) {
                // TODO: log error
            },

            onNotSupported: function() {
                document.getElementById("info").style.display = "none";
                asciiContainer.style.display = "none";
                document.getElementById("notSupported").style.display = "block";
            }
        });
    }
}