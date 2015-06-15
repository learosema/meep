var ac = new AudioContext();
function $(s,n){return (n || document).querySelector(s)}
function $$(s,n){return [].slice.call((n || document).querySelectorAll(s))}
console.log($('.piano'));
$('.piano').onclick = function (e) {
	console.log(e.target)
	var li, a, b=0, i;
	if (e.target.nodeName === 'A') {
		li = e.target.parentNode;
		a = e.target
	}
	if (e.target.nodeName === 'LI') {
		li = e.target;
		a = $('a', li)
		b = 1;
	}
	i = $$('.piano li').indexOf(li);
	console.log(i);
	playNote(i*2+b);
}

function playNote(i) {
	console.log(i);
}
