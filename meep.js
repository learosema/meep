w=window
d=document
$=String.fromCharCode
p=d.querySelector('.piano')
L=[].slice.call(p.querySelectorAll('li'))
ac=new AudioContext()
P=[]
m='mouse'
K="AWSEDFTGYHUJKOLP"
if(navigator.language=='de')K=K.replace(/Y/,'Z')
function I(e,b,l,n){
	l=e.target
	b=0
	if((n=l.nodeName)=='UL')return-1
	if(n=='LI')b=1
	if(n=='DIV')l=l.parentNode
	i=L.indexOf(l)
	i=(i/7|0)*12+("0x"+("024579b"[i%7])|0)+b
	return i
}
function N(i,O) {
	O=ac.createOscillator()
	O.connect(ac.destination)
	O.type="sawtooth"
	O.frequency.value=264*Math.pow(2,i/12)
	O.start()
	return O
}
w.onkeydown=function(e,i){
	i=K.indexOf($(e.keyCode))
	if(i<0||P[i])return
	P[i]=N(i)
}
w.onkeyup=function(e,i){
	i=K.indexOf($(e.keyCode))
	if(i>-1&&P[i]){P[i].stop();P[i]=0}
};
[m+'down',m+'over','dragstart','touchstart'].map(function(e){p['on'+e]=function(e,i){
	i=I(e)
	if(e.buttons==0||i<0||P[i])return
	P[i]=N(i)
}});
[m+'up',m+'out','dragend','touchend'].map(function(e){p['on'+e]=function(e,i){
	i=I(e)
	if(i>-1&&P[i]){P[i].stop();P[i]=0}
}})
