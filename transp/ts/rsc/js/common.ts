enum MenuState{
	MOBILE_CLOSED = 1,
	MOBILE_OPEN = 2,
	DESKTOP = 3,
	UNKNOW = 4
}
let menu = {
	//@ts-ignore
	menu:null as HTMLElement,
	//@ts-ignore
	button:null as HTMLElement,
	state:MenuState.UNKNOW,
	updatedState:function() {
		switch (menu.state) {
		case MenuState.DESKTOP:
			menu.menu.style='display:block';
			menu.button.style='display:none';
			break;
		case MenuState.MOBILE_CLOSED:
			menu.menu.style='display:none';
			menu.button.className='hmb';
			menu.button.style='display:block';
			break;
		case MenuState.MOBILE_OPEN:
			menu.menu.style='display:block;width:100%';
			menu.button.className='hmb close';
			menu.button.style='display:block';
			break;
		}
	},
	update:function() {
		let w = document.body.clientWidth;
		let newState = (w<650)?MenuState.MOBILE_CLOSED:MenuState.DESKTOP;
		if (newState <= MenuState.MOBILE_OPEN && menu.state <= MenuState.MOBILE_OPEN) return;
		if (newState == MenuState.DESKTOP && menu.state == MenuState.DESKTOP) return;
		menu.state = newState;
		menu.updatedState();
	},
	buttonAction:function() {
		menu.state = (menu.state==MenuState.MOBILE_CLOSED)?
			MenuState.MOBILE_OPEN:MenuState.MOBILE_CLOSED;
		menu.updatedState();
	},
	setup:function() {
		const header = document.body.querySelector('header') as HTMLElement;
		menu.menu = header.querySelector('.head-menu') as HTMLElement;
		menu.button = header.querySelector('.hmb') as HTMLElement;
		window.addEventListener('resize', menu.update);
		menu.update();

		menu.button.addEventListener('keydown',(e)=>{
			if (e.key == 'Enter')
				menu.buttonAction();
		});
		menu.button.addEventListener('click',menu.buttonAction);
	}
};

addEventListener('load',()=>{
	menu.setup();
});