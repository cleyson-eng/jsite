function changePainelsVisibility(e:HTMLElement, v:boolean, animated:boolean) {
	(Array.from(e.querySelectorAll('.painel'))as HTMLElement[]).forEach((c)=>{
		const nv = v?'block':'none';
		
		if (animated) {
			if (v) {
				c.style.opacity='0';
				c.style.display='block';
				setTimeout(()=>{
					c.style.opacity='1';
				},50);
			} else {
				c.style.opacity='0';
				setTimeout(()=>{
					c.style.display='none';
				},500);
			}
			return;
		}
		c.style.display=nv;
	});
}
function watchElementViewChange(e:HTMLElement, visibilityChange:(v:boolean)=>void) {
	const options = {
		root: null, rootMargin: '0px',
		threshold: 0 // trigger when 0% of the target is visible
	}
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			visibilityChange(entry.isIntersecting);
		});
	}, options);
	observer.observe(e);
}

addEventListener('load',()=>{
	const v1 = document.getElementById("view1") as HTMLElement;
	const v2 = document.getElementById("view2") as HTMLElement;
	const juan = document.getElementById("main-juan") as HTMLElement;
	watchElementViewChange(v1,(v)=>{
		changePainelsVisibility(v2, !v, true);
		juan.className=v?'':'right';
		console.log(v);
	});
});