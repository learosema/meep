w=window
d=document
$=String.fromCharCode
p=d.querySelector('.piano')
L=[].slice.call(p.querySelectorAll('li'))
ac=new AudioContext()
P=[]
m='mouse'
a='addEventListener'
function I(e){
	var l=e.target,b=0
	if(l.nodeName=='UL')return-1
	if(l.nodeName=='LI')b=1
	if(l.nodeName=='DIV')l=l.parentNode
	i=L.indexOf(l)
	i=(i/7|0)*12+("0x"+("024579b"[i%7])|0)+b
	return i
}
function N(i) {
	var O=ac.createOscillator()
	O.connect(ac.destination)
	O.type="sawtooth"
	O.frequency.value=264*Math.pow(2,i/12)
	O.start()
	return O
}
K="AWSEDFTGYHUJKOLP"
w.onkeydown=function(e){
	var i=K.indexOf($(e.keyCode))
	if(i<0||P[i])return
	P[i]=N(i)
}
w.onkeyup=function(e){
	var i=K.indexOf($(e.keyCode))
	if(i>-1&&P[i]){P[i].stop();P[i]=0}
};
[m+'down',m+'over','dragstart','touchstart'].map(function(e){p[a](e,function(e){
	var i=I(e)
	if(e.buttons==0||i<0||P[i])return
	P[i]=N(i)
})});
[m+'up',m+'out','dragend','touchend'].map(function(h){w[a](h,function(e){
	var i=I(e)
	if(i>-1&&P[i]){P[i].stop();P[i]=0}
})})
