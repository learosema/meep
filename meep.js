w=window
d=document
function $(s,n){return(n||d).querySelector(s)}
function $$(s,n){return[].slice.call((n||d).querySelectorAll(s))}
ac=new AudioContext()
P=[]
function mouse(e) {
	var li,b=0,i
	if(e.buttons==0||e.target.nodeName=='UL')return
	if(e.target.nodeName=='DIV')li=e.target.parentNode
	if(e.target.nodeName=='LI'){li=e.target;b=1}
	i=$$('.piano li').indexOf(li)
	i=(i/7|0)*12+("0x"+("024579b"[i%7])|0)+b
	if(P[i])return
	P[i]=note(i)
	var of=function(){
		if (P[i])P[i].stop()
		P[i]=null
		H.map(function(h) {
			w.removeEventListener(h)
		})
	}
	var H=['mouseup','mouseout','dragend'].map(function(h){
		return w.addEventListener(h,of)
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
	console.log(e)
};
['mousedown','mouseover','dragstart'].map(function(e){$('.piano').addEventListener(e,mouse)})
