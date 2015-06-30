w=window
d=document
$=String.fromCharCode
p=d.querySelector('.piano')
L=[].slice.call(p.querySelectorAll('li'))
a=new AudioContext()
P=[]
m='mouse'
K="AWSEDFTGYHUJKOLP"
if(navigator.language=='de')K=K.replace(/Y/,'Z')
function I(e,l,b,i,n){
	if(e.keyCode)return K.indexOf($(e.keyCode))
	l=e.target
	if((l[n='nodeName'])=='LI')b=1
	if(l[n]=='DIV')l=l.parentNode
	if(l[n]!='LI')return-1
	i=L.indexOf(l)
	i=(i/7|0)*12+("0x"+("024579b"[i%7])|0)+(b|0)
	return i
}
function N(i,O){
	O=a.createOscillator()
	O.connect(a.destination)
	O.type="sawtooth"
	O.frequency.value=264*Math.pow(2,i/12)
	O.start()
	return O
}
for(M=[m+'down',m+'over','dragstart','touchstart','touchmove','keydown'];e=M.pop();)w['on'+e]=function(e,i){
	i=I(e)
	if(e.buttons===0||i<0||P[i])return
	P[i]=N(i)
}
for(M=[m+'up',m+'out','dragend','touchend','touchcancel','keyup'];e=M.pop();)w['on'+e]=function(e,i){
	i=I(e)
	if(i>-1&&P[i]){P[i].stop();P[i]=0}
}

