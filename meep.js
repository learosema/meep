var ac = new AudioContext()
P=[]
//mini-jQuery ;)
function $(s,n){return(n||document).querySelector(s)}
function $$(s,n){return[].slice.call((n||document).querySelectorAll(s))}

function mouseHandler(e){
	var li,a,b=0,i
	if(e.buttons==0)return
	if(e.target.nodeName=='A') {
		li=e.target.parentNode
		a=e.target
	}
	if (e.target.nodeName=='LI') {
		li=e.target
		a=$('a',li)
		b=1
	}
	i=$$('.piano li').indexOf(li)
	i=(i/7|0)*12+("0x"+("024579b"[i%7])|0)+b
	if(P[i])return
	P[i]=note(i)
	var off=function () {
    	if (P[i])P[i].stop()
    	P[i]=void 0
		H.map(function(h){window.removeEventListener(h)})		
    }
    var H=['mouseup','mouseout','dragend'].map(function(h){return window.addEventListener(h, off)})
}

['mousedown','mouseover','dragstart'].map(function(e){$('.piano').addEventListener(e, mouseHandler)})


function note(i,g) {
	var osc = ac.createOscillator()
    var gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = "sawtooth"
    osc.frequency.value = 264*Math.pow(2,i/12)
    gain.gain.value = g || 1.0
    osc.start()
    return osc;
}

window.onkeydown = function (e) {
	console.log(e)
}

