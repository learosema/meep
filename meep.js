w=window
d=document
p=d.querySelector('.piano')
L=[].slice.call(p.querySelectorAll('li'))
ac=new AudioContext()
P=[]
function mouse(e){
	var l=e.target,b=0,i
	if(e.buttons==0||l.nodeName=='UL')return
	if(l.nodeName=='LI')b=1
	if(l.nodeName=='DIV')l=l.parentNode
	i=L.indexOf(l)
	i=(i/7|0)*12+("0x"+("024579b"[i%7])|0)+b
	if(P[i])return
	P[i]=note(i)
	var off=function(){
		if (P[i])P[i].stop()
		P[i]=null
		H.map(function(h) {
			w.removeEventListener(h)
		})
	}
	var H=['mouseup','mouseout','dragend','touchend'].map(function(h){
		return w.addEventListener(h,off)
	})
}
function note(i) {
	var O=ac.createOscillator()
	O.connect(ac.destination)
	O.type="sawtooth"
	O.frequency.value=264*Math.pow(2,i/12)
	O.start()
	return O
}
w.onkeydown=function(e) {
	console.log(e.keyCode)
};
['mousedown','mouseover','dragstart','touchstart'].map(function(e){p.addEventListener(e,mouse)})
