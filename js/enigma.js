
// rough attempt at d3 version of Enigma(1972), Lillian Schwarz

var enigma = {
    currData: [],
    svg: d3.select('#enigma-wrapper').append('svg'),
    g: null,
    size: 500,
    ticker: 0,
    interval: 150,
    transition: 50,
    maxLines: 50,
    durations: [
        1,
        2,
        5,
        20,
    ],
    backgrounds: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm'
    ],
    init: function(){

        this.svg.attr('width', this.size * 1.4);
        this.svg.attr('height',this.size);

        var gradient1 = this.svg.append('defs')
            .append('linearGradient')
                .attr('id','grd1')
                .attr('x1',0)
                .attr('x2',0)
                .attr('y1',0)
                .attr('y2',1)
        gradient1
            .append('stop')
                .attr('offset','0%')
                .attr('stop-color','magenta')
        gradient1
            .append('stop')
                .attr('offset','50%')
                .attr('stop-color','cyan')

        this.g = this.svg.append('g')
    },

    update: function(currData){

        var currDuration = this.durations[Math.floor(Math.random() * this.durations.length)];

        // console.log(this.ticker)
        // if ( this.ticker%currDuration ) { console.log ('switch'); }

        if ( this.ticker%currDuration ){
            
            if (this.ticker > 100) {
                var background = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length/2)];
            }

            if (this.ticker > 250) {
                var background = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
            }
        }

        this.svg
            .transition(d3.transition(this.interval))
            .attr('id',background);

        var linesH = this.g.selectAll('line.h')
            .data(currData)

        var linesV = this.g.selectAll('line.v')
            .data(currData)

        function getY(d){
            return 500/d3.max(currData) * d;
        }

        function getStrokeWidth(){
            return currData[0];
        }

        linesH
            .enter()
            .append('line')
            .attr('class','h')
            .attr('x1', 0)
            .attr('x2', this.size * 1.4)
            .attr('y1', function(d){ return getY(d) })
            .attr('y2', function(d){ return getY(d) })
            .attr('stroke', 'black')
            .attr('stroke-width', function(d){ return getStrokeWidth() });

        linesH
            .exit()
            .transition(d3.transition().duration(this.transition))
            .attr('stroke-width', 0)
            .remove();

        linesH
            .transition(d3.transition().duration(this.transition))
            .attr('stroke-width', function(d){ return getStrokeWidth() });
        linesV
            .enter()
            .append('line')
            .attr('class','v')
            .attr('y1', 0)
            .attr('y2', this.size)
            .attr('x1', function(d){ return getY(d) })
            .attr('x2', function(d){ return getY(d) })
            .attr('stroke', 'black')
            .attr('stroke-width', function(d){ return getStrokeWidth() });

        linesV
            .exit()
            .transition(d3.transition().duration(this.transition))
            .attr('stroke-width', 0)
            .remove();

        linesV
            .transition(d3.transition().duration(this.transition))
            .attr('stroke-width', function(d){ return getStrokeWidth() });

    },

    updateWrapper: function(){

        var data = [],
            numLines = Math.floor(this.maxLines * Math.random());

        for (var i = 1; i <= numLines; i++) {
            data.push(i);
        }

        data = data.map(function(d){ return d * 100 * Math.random(); });

        // if (data.length > 10){
        //     data = [100];
        // } 

        this.update(data);
    },

    animate: function(){
        d3.interval(function(d){
            this.updateWrapper();
            this.ticker++;
        }.bind(this), this.interval);
    }
}