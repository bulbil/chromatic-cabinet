
var channels = {

    asciiContainers: [
        document.getElementById("r-corrected"),
        document.getElementById("g-corrected"),
        document.getElementById("b-corrected"),
        document.getElementById("r"),
        document.getElementById("g"),
        document.getElementById("b")
    ],
    camera: null,
    capturing: false,
    width: 100,
    height: 100,
    fps: 1,
    mirror: true,
    init: function(){

        camera.init({

            width: this.width,
            height: this.height,
            fps: this.fps,
            mirror: this.mirror,

            onFrame: function(canvas) {

                ascii.channelFromCanvas(canvas, {
                    // contrast: 128,
                    callback: function(asciiStrings) {

                        for (var i =0; i < this.asciiContainers.length; i++){
                            this.asciiContainers[i].innerHTML = asciiStrings[i];
                        }
                    }.bind(this)
                });
            }.bind(this),

            onSuccess: function() {

                document.getElementById("info").style.display = "none";

                this.camera = camera;

                capturing = true;
                document.getElementById("pause").style.display = "block";
                document.getElementById("pause").onclick = function() {
                    console.log(capturing);
                    if (capturing) {
                        camera.pause();
                    } else {
                        camera.start();
                    }
                    capturing = !capturing;
                };
            }.bind(this),

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