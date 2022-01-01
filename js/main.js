let shift_key = false;
document.addEventListener('keydown', function(e) {
	if (e.key == 'Shift') {
		shift_key = true;
	}
}) 
document.addEventListener('keyup', function(e) {
	if (e.key == 'Shift') {
		shift_key = false;
	}
}) 


//удаление линий с клавишой Delete
document.addEventListener('keydown', function(e) {
	if (e.key == 'Delete' && line_delete_button.style.display == 'block') {
		model.deleteLine(line_delete_button.getAttribute('delete-line'));
		line_delete_button.style.display = 'none';
	}
})

//навигация слайда с клавишами 1,2,3,4
document.addEventListener('keydown', function(e) {
	let present_mode = document.getElementById('present_mode');

	let button1 = document.querySelectorAll('.slide_button')[0];
	let button2 = document.querySelectorAll('.slide_button')[1];
	let button3 = document.querySelectorAll('.slide_button')[2];
	let button4 = document.querySelectorAll('.slide_button')[3];

	if (e.key == '1' && present_mode.style.display == 'block' && button1.style.display == 'block') {
		let id = button1.getAttribute('next-id');
		viewPresent.show(id);

		document.getElementById('slide_anim_1').style.display = 'block';
		setTimeout(function() {document.getElementById('slide_anim_1').style.display = 'none';}, 400);
	}
	if (e.key == '2' && present_mode.style.display == 'block' && button2.style.display == 'block') {
		let id = button2.getAttribute('next-id');
		viewPresent.show(id);

		document.getElementById('slide_anim_2').style.display = 'block';
		setTimeout(function() {document.getElementById('slide_anim_2').style.display = 'none';}, 400);
	}
	if (e.key == '3' && present_mode.style.display == 'block' && button3.style.display == 'block') {
		let id = button3.getAttribute('next-id');
		viewPresent.show(id);

		document.getElementById('slide_anim_3').style.display = 'block';
		setTimeout(function() {document.getElementById('slide_anim_3').style.display = 'none';}, 400);
	}
	if (e.key == '4' && present_mode.style.display == 'block' && button4.style.display == 'block') {
		let id = button4.getAttribute('next-id');
		viewPresent.show(id);

		document.getElementById('slide_anim_4').style.display = 'block';
		setTimeout(function() {document.getElementById('slide_anim_4').style.display = 'none';}, 400);
	}
})






function load() {
    const items = localStorage.getItem('items');
    const lines = localStorage.getItem('lines');
    const data = {
    	items: JSON.parse(items) || [],
    	lines: JSON.parse(lines) || []
    }

    return data;
}
const data = load();




class Model {
	constructor(data) {
		this.items = data.items;
		this.lines = data.lines;
		
		if (this.items.length == 0) {
			this.addItem(625, 270);
		} else {
			view.show(this.items);
		}
		
		if (this.lines.length > 0) {
			this.lines.forEach(line => {
				view.createLine(line);
			});
		}

	}

	addItem(posX, posY, id, line) {
		let item = {
			id: Date.now(),
			posX,
			posY
		}
		
		if (line) {
			item[line] = Number(id);
			let edit_item = this.items.find(item => item.id == id);
			let line_id = Date.now();
			let x1;
			let y1;
			let x2;
			let y2;

			let id1_line
			let id2_line = line;

			if (line == 's1') {
				edit_item.s3 = item.id;
				item.line1 = line_id;
				edit_item.line3 = line_id;
				id1_line = 's3';

				x2 = item.posX +40;
				y2 = item.posY;
				x1 = edit_item.posX +40;
				y1 = edit_item.posY +80;
			}
			if (line == 's2') {
				edit_item.s4 = item.id;
				item.line2 = line_id;
				edit_item.line4 = line_id;
				id1_line = 's4';

				x2 = item.posX +80;
				y2 = item.posY +40;
				x1 = edit_item.posX ;
				y1 = edit_item.posY +40;
			}
			if (line == 's3') {
				edit_item.s1 = item.id;
				item.line3 = line_id;
				edit_item.line1 = line_id;
				id1_line = 's1';

				x2 = item.posX +40;
				y2 = item.posY +80;
				x1 = edit_item.posX +40;
				y1 = edit_item.posY;
			}
			if (line == 's4') {
				edit_item.s2 = item.id;
				item.line4 = line_id;
				edit_item.line2 = line_id;
				id1_line = 's2';

				x2 = item.posX;
				y2 = item.posY +40;
				x1 = edit_item.posX +80;
				y1 = edit_item.posY +40;
			}

			this.addLine(line_id, x1, y1, x2, y2, edit_item.id, item.id, id1_line, id2_line);
		}

		this.items.push(item);
		view.addItem(item);
	}

	connection(id1, id2, line1, line2) {
		let target_item = this.items.find(item => item.id == id1);
		let drop_item = this.items.find(item => item.id == id2);

		id1 = Number(id1);
		id2 = Number(id2);

		let line_id = Date.now();
		let x1
		let y1
		let x2
		let y2

		target_item[line1] = id2;
		drop_item[line2] = id1;


		if (line1 == 's1') {
			target_item.line1 = line_id;
			x1 = target_item.posX +40;
			y1 = target_item.posY;
		}
		if (line1 == 's2') {
			target_item.line2 = line_id;
			x1 = target_item.posX +80;
			y1 = target_item.posY +40;
		}
		if (line1 == 's3') {
			target_item.line3 = line_id;
			x1 = target_item.posX +40;
			y1 = target_item.posY +80;
		}
		if (line1 == 's4') {
			target_item.line4 = line_id;
			x1 = target_item.posX;
			y1 = target_item.posY +40;
		}


		if (line2 == 's1') {
			drop_item.line1 = line_id;
			x2 = drop_item.posX +40;
			y2 = drop_item.posY;
		}
		if (line2 == 's2') {
			drop_item.line2 = line_id;
			x2 = drop_item.posX +80;
			y2 = drop_item.posY +40;
		}
		if (line2 == 's3') {
			drop_item.line3 = line_id;
			x2 = drop_item.posX +40;
			y2 = drop_item.posY +80;
		}
		if (line2 == 's4') {
			drop_item.line4 = line_id;
			x2 = drop_item.posX;
			y2 = drop_item.posY +40;
		}

		this.addLine(line_id, x1, y1, x2, y2, id1, id2, line1, line2);
	}

	addLine(id, x1, y1, x2, y2, id1, id2, id1_line, id2_line) {
		let line = {
			id,
			x1,
			y1,
			x2,
			y2,
			id1,
			id2,
			id1_line,
			id2_line
		}
		this.lines.push(line);
		view.createLine(line);
	}

	deleteLine(id) {
		let line = this.lines.find(line => line.id == id);
		let item1 = this.items.find(item => item.id == line.id1);
		let item2 = this.items.find(item => item.id == line.id2);

		if (item1) {
			delete item1[line.id1_line];

			if (line.id1_line == 's1') {
			delete item1.line1
			}
			if (line.id1_line == 's2') {
				delete item1.line2
			}
			if (line.id1_line == 's3') {
				delete item1.line3
			}
			if (line.id1_line == 's4') {
				delete item1.line4
			}
		}


		if (item2) {
			delete item2[line.id2_line];

			if (line.id2_line == 's1') {
			delete item2.line1
			}
			if (line.id2_line == 's2') {
				delete item2.line2
			}
			if (line.id2_line == 's3') {
				delete item2.line3
			}
			if (line.id1_line == 's4') {
				delete item2.line4
			}
		}
		

		let index = this.lines.findIndex(line => line.id == id);

		if (index > -1) {
			this.lines.splice(index, 1);
		}

		view.deleteLine(id, line.id1, line.id2, line.id1_line, line.id2_line);
	}

	deleteItem(id) {
		let item = this.items.find(item => item.id == id);

		let index = this.items.findIndex(item => item.id == id);

		if (index > -1) {
			this.items.splice(index, 1);
		}
		
		Object.keys(item).forEach(key => {
			let item_line
			let item_s

			if (key == 'line1') {
				item_line = 'line1';
				item_s = 's1';
			}
			if (key == 'line2') {
				item_line = 'line2';
				item_s = 's2';
			}
			if (key == 'line3') {
				item_line = 'line3';
				item_s = 's3';
			}
			if (key == 'line4') {
				item_line = 'line4';
				item_s = 's4';
			}

			if (item_line) {
				let elem_id = item[item_s];
				let line = this.lines.find(line => line.id == item[item_line]);
				let elem = this.items.find(item => item.id == elem_id);

				let elem_s
				let elem_line


				if (line) {
					if (line.id1 == item[item_s]) {elem_s = line.id1_line}
					if (line.id2 == item[item_s]) {elem_s = line.id2_line}

					if (elem_s == 's1') {elem_line = 'line1'}
					if (elem_s == 's2') {elem_line = 'line2'}
					if (elem_s == 's3') {elem_line = 'line3'}
					if (elem_s == 's4') {elem_line = 'line4'}

					delete elem[elem_s];
					delete elem[elem_line];

					this.deleteLine(line.id);
				}
				
				
			}
		});
	}
}





////////////////////////////////////////


class View {
	constructor() {
		this.field = document.getElementById('edit_mode');
		this.svg = document.getElementById('svg');
	}

	show(items) {
		items.forEach(item => {
			let elem = this.create(item);
			this.field.appendChild(elem);
		});
	}

	createLine(line) {
		let element = document.createElementNS('http://www.w3.org/2000/svg','line');
		element.setAttribute('line-id',line.id);
		element.setAttribute('x1',line.x1);
		element.setAttribute('y1',line.y1);
		element.setAttribute('x2',line.x2);
		element.setAttribute('y2',line.y2);
		element.setAttribute('data-id1',line.id1);
		element.setAttribute('data-id2',line.id2);
		element.setAttribute('stroke-width',4);

		element.addEventListener('click', this.lineAddEventListener.bind(this));

		this.svg.appendChild(element);
	}

	lineAddEventListener({target}) {
			let delete_button = document.getElementById('line_delete');

			delete_button.style.left = event.pageX+13 +'px';
			delete_button.style.top = event.pageY-10 +'px';
			delete_button.style.display = 'block';
			delete_button.setAttribute('delete-line', target.getAttribute('line-id'));
			
			document.addEventListener('click', function(e) {
				let otherTar = e.target;
				let its_elem = otherTar == target;

				if (!its_elem) {
					delete_button.style.display = 'none';
				} else {
					delete_button.style.display = 'block';
				}
			})
	}


	create(item) {
		let element = document.createElement("div");
		let div1 = document.createElement("div");
		let div2 = document.createElement("div");
		let div3 = document.createElement("div");
		let div4 = document.createElement("div");
		let elem_name = document.createElement("span");
		elem_name.className = "elem_name";

		element.className = "elem";
		div1.className = "ss s1";
		div2.className = "ss s2";
		div3.className = "ss s3";
		div4.className = "ss s4";

		Object.keys(item).forEach(key => {
			if (key == 's1') {element.classList.add('sn1')}
			if (key == 's2') {element.classList.add('sn2')}
			if (key == 's3') {element.classList.add('sn3')}
			if (key == 's4') {element.classList.add('sn4')}
		});

		if (item.slideName) {elem_name.textContent = item.slideName}

		div1.innerHTML = "<span>1</span>";
		div2.innerHTML = "<span>2</span>";
		div3.innerHTML = "<span>3</span>";
		div4.innerHTML = "<span>4</span>";

		element.appendChild(div1);
		element.appendChild(div2);
		element.appendChild(div4);
		element.appendChild(div3);
		element.appendChild(elem_name);

		element.setAttribute("data-id", item.id);
		element.style.left = item.posX +"px";
		element.style.top = item.posY +"px";
		
		return this.addEventListeners(element);
	}

	addEventListeners(element) {
		element.addEventListener('dblclick', this.dblClick.bind(this));

		let s1 = element.querySelector('.s1');
		let s2 = element.querySelector('.s2');
		let s3 = element.querySelector('.s3');
		let s4 = element.querySelector('.s4');

		s1.addEventListener('click', this.s1Click.bind(this));
		s2.addEventListener('click', this.s2Click.bind(this));
		s3.addEventListener('click', this.s3Click.bind(this));
		s4.addEventListener('click', this.s4Click.bind(this));


		element.addEventListener('mousedown', function(event) {
			element.classList.add('drag');

			let shiftX = event.clientX - element.offsetLeft;
			let shiftY = event.clientY - element.offsetTop;

			let copy_id
			let currentDroppable = null;
			let target_elem_id = event.target.closest('.elem').getAttribute('data-id');

			if (event.target.closest('.s1') && !event.target.closest('.sn1')) {copy_id = 'sd1'}
			if (event.target.closest('.s2') && !event.target.closest('.sn2')) {copy_id = 'sd2'}
			if (event.target.closest('.s3') && !event.target.closest('.sn3')) {copy_id = 'sd3'}
			if (event.target.closest('.s4') && !event.target.closest('.sn4')) {copy_id = 'sd4'}


			function moveAt(pageX, pageY) {
			  element.style.left = pageX - shiftX + 'px';
			  element.style.top = pageY - shiftY + 'px';

			  let id = element.getAttribute('data-id');
			  let item = model.items.find(item => item.id == id);

			  if (element.classList.contains('sn1')) {
			  	let line = view.svg.querySelector(`[line-id="${item.line1}"]`);
			  	let line_model = model.lines.find(line => line.id == item.line1);
			  	let x
			  	let y

			  	if (line.getAttribute('data-id1') == id) {x = 'x1'; y = 'y1';}
			  	if (line.getAttribute('data-id2') == id) {x = 'x2'; y = 'y2';}

			  	line.setAttribute(x, element.offsetLeft +40);
			  	line.setAttribute(y, element.offsetTop);

			  	line_model[x] = element.offsetLeft +40;
			  	line_model[y] = element.offsetTop;
			  }

			  if (element.classList.contains('sn2')) {
			  	let line = view.svg.querySelector(`[line-id="${item.line2}"]`);
			  	let line_model = model.lines.find(line => line.id == item.line2);
			  	let x
			  	let y

			  	if (line.getAttribute('data-id1') == id) {x = 'x1'; y = 'y1';}
			  	if (line.getAttribute('data-id2') == id) {x = 'x2'; y = 'y2';}
		  	
			  	line.setAttribute(x, element.offsetLeft +80);
			  	line.setAttribute(y, element.offsetTop +40);

			  	line_model[x] = element.offsetLeft +80;
			  	line_model[y] = element.offsetTop +40;
			  }

			  if (element.classList.contains('sn3')) {
			  	let line = view.svg.querySelector(`[line-id="${item.line3}"]`);
			  	let line_model = model.lines.find(line => line.id == item.line3);
			  	let x
			  	let y

			  	if (line.getAttribute('data-id1') == id) {x = 'x1'; y = 'y1';}
			  	if (line.getAttribute('data-id2') == id) {x = 'x2'; y = 'y2';}

			  	line.setAttribute(x, element.offsetLeft +40);
			  	line.setAttribute(y, element.offsetTop +80);

			  	line_model[x] = element.offsetLeft +40;
			  	line_model[y] = element.offsetTop +80;
			  }

			  if (element.classList.contains('sn4')) {
			  	let line = view.svg.querySelector(`[line-id="${item.line4}"]`);
			  	let line_model = model.lines.find(line => line.id == item.line4);
			  	let x
			  	let y

			  	if (line.getAttribute('data-id1') == id) {x = 'x1'; y = 'y1';}
			  	if (line.getAttribute('data-id2') == id) {x = 'x2'; y = 'y2';}

			  	line.setAttribute(x, element.offsetLeft);
			  	line.setAttribute(y, element.offsetTop +40);

			  	line_model[x] = element.offsetLeft;
			  	line_model[y] = element.offsetTop +40;
			  }
			}
			
			function lineMove(pageX, pageY) {
				if (copy_id) {
					let elem = document.getElementById(copy_id);
					elem.style.left = pageX-15 +'px';
					elem.style.top = pageY-15 +'px';
					elem.style.display = 'flex';

					let active = document.querySelectorAll('.elem');
					active.forEach(elem => {
						if (elem.classList.contains('elem')) {
							elem.classList.add('active');
						}
					})
				}
			}

			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY);		  
			}
			function onLineMove(event) {
				lineMove(event.pageX, event.pageY);

				if (copy_id) {
					document.getElementById(copy_id).style.display = 'none';
					let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
					document.getElementById(copy_id).style.display = 'flex';
					let droppableBelow


					if (!elemBelow) return;

					if (elemBelow.closest('.s1') && !elemBelow.closest('.sn1')
						|| elemBelow.closest('.s2') && !elemBelow.closest('.sn2')
						|| elemBelow.closest('.s3') && !elemBelow.closest('.sn3')
						|| elemBelow.closest('.s4') && !elemBelow.closest('.sn4')) {
						if (elemBelow.closest('.elem').getAttribute('data-id') != target_elem_id) {
							droppableBelow = elemBelow.closest('.ss');
						}
						
					}

					
					if (currentDroppable != droppableBelow) {
						if (currentDroppable) {
							leaveDroppable(currentDroppable);
						}

						currentDroppable = droppableBelow;
						
						if (currentDroppable) {
							enterDroppable(currentDroppable);
						}
					}
				}			
			}

			function enterDroppable(elem) {
				elem.style.background = '#77f363';
			}
			function leaveDroppable(elem) {
				elem.style.background = '#60db4d';
			}

			if (element.classList.contains('active') == false) {
				document.addEventListener('mousemove', onMouseMove);
			} else {
				if (shift_key) {
					document.addEventListener('mousemove', onLineMove);
				}			
			}			
			
			if (copy_id) {
				document.getElementById(copy_id).onmouseup = function() {
					document.removeEventListener('mousemove', onLineMove);
					document.getElementById(copy_id).style.display = 'none';
					document.getElementById('elem_delete').style.display = 'none';
					document.getElementById('elem_edit').style.display = 'none';

					let active = document.querySelectorAll('.elem');
					active.forEach(elem => {
						if (elem.classList.contains('elem')) {elem.classList.remove('active')}
					})

					if (currentDroppable) {
						currentDroppable.style.background = 'darkgray';
						event.target.closest('.ss').style.background = 'darkgray';
						let target_line
						let drop_line

						if (currentDroppable.classList.contains('s1')) {
							drop_line = 's1';
							currentDroppable.closest('.elem').classList.add('sn1');
						}
						if (currentDroppable.classList.contains('s2')) {
							drop_line = 's2';
							currentDroppable.closest('.elem').classList.add('sn2');
						}
						if (currentDroppable.classList.contains('s3')) {
							drop_line = 's3';
							currentDroppable.closest('.elem').classList.add('sn3');
						}
						if (currentDroppable.classList.contains('s4')) {
							drop_line = 's4';
							currentDroppable.closest('.elem').classList.add('sn4');
						}

						if (copy_id == 'sd1') {
							target_line = 's1';
							event.target.closest('.elem').classList.add('sn1');
						}
						if (copy_id == 'sd2') {
							target_line = 's2';
							event.target.closest('.elem').classList.add('sn2');
						}
						if (copy_id == 'sd3') {
							target_line = 's3';
							event.target.closest('.elem').classList.add('sn3');
						}
						if (copy_id == 'sd4') {
							target_line = 's4';
							event.target.closest('.elem').classList.add('sn4');
						}

						let drop_elem_id = currentDroppable.closest('.elem').getAttribute('data-id');
						
						model.connection(target_elem_id, drop_elem_id, target_line, drop_line);
					}
				}
			}
			element.onmouseup = function() {
			  document.removeEventListener('mousemove', onMouseMove);
			  document.removeEventListener('mousemove', onLineMove);

			  element.classList.remove('drag');
			  
			  element.onmouseup = null;

			  let id = element.getAttribute('data-id');
			  let elem = model.items.find(item => item.id == id);
			  elem.posX = element.offsetLeft;
			  elem.posY = element.offsetTop;
			};
		}); //конец element.addEventListener

		return element;
	}




	dblClick({target}) {
		let id = target.closest('.elem').getAttribute("data-id");
		let elem = this.field.querySelector(`[data-id="${id}"]`);
		elem.classList.add('active');

		let delete_button = document.getElementById('elem_delete');
		let edit_button = document.getElementById('elem_edit');

		if (id != model.items[0].id) {
			delete_button.style.left = target.closest('.elem').offsetLeft +87 +'px';
			delete_button.style.top = target.closest('.elem').offsetTop +28 +'px';
			delete_button.style.display = 'block';
			delete_button.setAttribute('delete-elem', target.closest('.elem').getAttribute('data-id'));
		}
		

		edit_button.style.left = target.closest('.elem').offsetLeft -28 +'px';
		edit_button.style.top = target.closest('.elem').offsetTop +28 +'px';
		edit_button.style.display = 'block';
		edit_button.setAttribute('edit-elem', target.closest('.elem').getAttribute('data-id'));

		document.addEventListener('click', function(e) {
			let otherTar = e.target;
			let its_elem = otherTar == elem || elem.contains(otherTar);
			let elem_is_active = elem.classList.contains('active');
			
			if (!its_elem && elem_is_active) {
				elem.classList.remove('active');
				delete_button.style.display = 'none';
				edit_button.style.display = 'none';
			}
		})
	}

	s1Click({target}) {
		let element = target.closest('.elem');
		let id = element.getAttribute("data-id");
		let elem = this.field.querySelector(`[data-id="${id}"]`);

		if (elem.classList.contains('sn1') == false) {
			model.addItem(elem.offsetLeft, elem.offsetTop -130, id, 's3');
			elem.classList.add('sn1');
		}		
	}
	s2Click({target}) {
		let element = target.closest('.elem');
		let id = element.getAttribute("data-id");
		let elem = this.field.querySelector(`[data-id="${id}"]`);

		if (elem.classList.contains('sn2') == false) {
			model.addItem(elem.offsetLeft +130, elem.offsetTop, id, 's4');
			elem.classList.add('sn2');
		}		
	}
	s3Click({target}) {
		let element = target.closest('.elem');
		let id = element.getAttribute("data-id");
		let elem = this.field.querySelector(`[data-id="${id}"]`);

		if (elem.classList.contains('sn3') == false) {
			model.addItem(elem.offsetLeft, elem.offsetTop +130, id, 's1');
			elem.classList.add('sn3');
		}		
	}
	s4Click({target}) {
		let element = target.closest('.elem');
		let id = element.getAttribute("data-id");
		let elem = this.field.querySelector(`[data-id="${id}"]`);

		if (elem.classList.contains('sn4') == false) {
			model.addItem(elem.offsetLeft -130, elem.offsetTop, id, 's2');
			elem.classList.add('sn4');
		}		
	}

	addItem(item) {
		let elem = this.create(item);
		this.field.appendChild(elem);
	}

	deleteLine(id, item1_id, item2_id, item1_line, item2_line) {
		this.svg.querySelector(`[line-id="${id}"]`).remove();

		if (item1_line == 's1') {item1_line = 'sn1'}
		if (item1_line == 's2') {item1_line = 'sn2'}
		if (item1_line == 's3') {item1_line = 'sn3'}
		if (item1_line == 's4') {item1_line = 'sn4'}

		if (item2_line == 's1') {item2_line = 'sn1'}
		if (item2_line == 's2') {item2_line = 'sn2'}
		if (item2_line == 's3') {item2_line = 'sn3'}
		if (item2_line == 's4') {item2_line = 'sn4'}


		this.field.querySelector(`[data-id="${item1_id}"]`).classList.remove(item1_line);
		this.field.querySelector(`[data-id="${item2_id}"]`).classList.remove(item2_line);
	}

	deleteItem(id) {
		this.field.querySelector(`[data-id="${id}"]`).remove();
	}
}





//////////////////////////////////////


class ViewPresent {
	constructor(model) {
		this.items = model;
		this.slideName = document.getElementById('slide_name');
		this.slideArea = document.getElementById('slide_area');
		this.buttonArea = document.getElementById('button_area');

		this.button1 = document.querySelectorAll('.slide_button')[0];
		this.button2 = document.querySelectorAll('.slide_button')[1];
		this.button3 = document.querySelectorAll('.slide_button')[2];
		this.button4 = document.querySelectorAll('.slide_button')[3];


		this.tree = document.getElementById('tree_in');
		this.tree.innerHTML = '';


		document.getElementById('tree_close').onclick = function() {
			document.getElementById('tree').style.left = -280 +'px';
		}
		document.getElementById('tree_burger').onclick = function() {
			document.getElementById('tree').style.left = 0 +'px';
		}

		this.items.forEach(item => {
			let index = this.items.findIndex(ind => ind.id == item.id)+1;

			let elem = document.createElement("span");
			elem.innerHTML = index + ' | Без названия';
			elem.setAttribute("tree-id", item.id);
			if (item.slideName) {elem.innerHTML = index + ' | ' +item.slideName}

			elem.onclick = function() {
				viewPresent.show(item.id);
			}

			this.tree.appendChild(elem);
		});

		this.button1.onclick = function () {
			let id = this.getAttribute('next-id');
			viewPresent.show(id);

			document.getElementById('slide_anim_1').style.display = 'block';
			setTimeout(function() {document.getElementById('slide_anim_1').style.display = 'none';}, 400);
		}
		this.button2.onclick = function () {
			let id = this.getAttribute('next-id');
			viewPresent.show(id);

			document.getElementById('slide_anim_2').style.display = 'block';
			setTimeout(function() {document.getElementById('slide_anim_2').style.display = 'none';}, 400);
		}
		this.button3.onclick = function () {
			let id = this.getAttribute('next-id');
			viewPresent.show(id);

			document.getElementById('slide_anim_3').style.display = 'block';
			setTimeout(function() {document.getElementById('slide_anim_3').style.display = 'none';}, 400);
		}
		this.button4.onclick = function () {
			let id = this.getAttribute('next-id');
			viewPresent.show(id);

			document.getElementById('slide_anim_4').style.display = 'block';
			setTimeout(function() {document.getElementById('slide_anim_4').style.display = 'none';}, 400);
		}


		this.show(this.items[0].id);		
	}




	show(id) {
		let current_item = this.items.find(item => item.id == id);

		let current_tree = this.tree.querySelector('.active');
		if (current_tree) {
			current_tree.classList.remove('active');
		}
		
		this.tree.querySelector(`[tree-id="${id}"]`).classList.add('active');


		this.slideName.innerHTML = 'Без названия';
		this.slideArea.innerHTML = '';

		this.button1.style.display = 'none';
		this.button2.style.display = 'none';
		this.button3.style.display = 'none';
		this.button4.style.display = 'none';

		if (current_item.slideName) {
			this.slideName.innerHTML = current_item.slideName;
		}
		if (current_item.slideContent) {
			this.slideArea.innerHTML = current_item.slideContent;
		}


		if (current_item.s1) {
			let next = this.items.find(item => item.id == current_item.s1);

			if (next.slideName) {this.button1.innerHTML = '1 - ' + next.slideName;}
			else {this.button1.innerHTML = '1 - Без названия';}

			this.button1.style.display = 'block';
			this.button1.setAttribute('next-id', current_item.s1);
		} 



		if (current_item.s2) {
			let next = this.items.find(item => item.id == current_item.s2);
			
			if (next.slideName) {this.button2.innerHTML = '2 - ' + next.slideName;}
			else {this.button2.innerHTML = '2 - Без названия';}

			this.button2.style.display = 'block';
			this.button2.setAttribute('next-id', current_item.s2);
		} 



		if (current_item.s3) {
			let next = this.items.find(item => item.id == current_item.s3);
			
			if (next.slideName) {this.button3.innerHTML = '3 - ' + next.slideName;}
			else {this.button3.innerHTML = '3 - Без названия';}

			this.button3.style.display = 'block';
			this.button3.setAttribute('next-id', current_item.s3);
		} 



		if (current_item.s4) {
			let next = this.items.find(item => item.id == current_item.s4);

			if (next.slideName) {this.button4.innerHTML = '4 - ' + next.slideName;}
			else {this.button4.innerHTML = '4 - Без названия';}

			this.button4.style.display = 'block';
			this.button4.setAttribute('next-id', current_item.s4);
		} 
	}
}



let view = new View();
let model = new Model(data || undefined);
let viewPresent;

view.field.querySelector('.elem').style.background = '#f0b916';



let line_delete_button = document.getElementById('line_delete');

line_delete_button.addEventListener('click', function() {
	model.deleteLine(line_delete_button.getAttribute('delete-line'));
	line_delete_button.style.display = 'none';
});




let elem_delete_button = document.getElementById('elem_delete');

elem_delete_button.addEventListener('click', function() {
		let id = elem_delete_button.getAttribute('delete-elem');
		model.deleteItem(id);
		view.field.querySelector(`[data-id="${id}"]`).remove();
		elem_delete_button.style.display = 'none';
})



let elem_edit_button = document.getElementById('elem_edit');
let edit_block = document.getElementById('edit_block');
let edit_block_close = document.getElementById('edit_block_close');
let editor = document.getElementById('editor');


elem_edit_button.addEventListener('click', function() {
	edit_block.style.display = 'block';

	let textarea;
	let name = document.getElementById('elem_name');
	
	editor.childNodes.forEach(elem => {
		if (elem.classList.contains('fr-wrapper')) {
			textarea = elem.childNodes[0];
		}
	});

	let elem = model.items.find(item => item.id == elem_edit_button.getAttribute('edit-elem'));

	if (elem.slideName) {
		name.value = elem.slideName;
	}
	if (elem.slideContent) {
		textarea.innerHTML = elem.slideContent;
	}
})

edit_block_close.addEventListener('click', function() {
	edit_block.style.display = 'none';

	let textarea;
	let name = document.getElementById('elem_name');

	editor.childNodes.forEach(elem => {
		if (elem.classList.contains('fr-wrapper')) {
			textarea = elem.childNodes[0];
		}
	});
	
	let elem = model.items.find(item => item.id == elem_edit_button.getAttribute('edit-elem'));

	
		elem.slideName = name.value;

		let elem_name = view.field.querySelector(`[data-id="${elem.id}"]`).querySelector('.elem_name');
		elem_name.innerHTML = name.value;
	

		elem.slideContent = textarea.innerHTML;


	name.value = '';
	textarea.innerHTML = '';
})








let edit_mode_switch = document.getElementById('edit_mode_switch');
let edit_mode = document.getElementById('edit_mode');

let present_mode = document.getElementById('present_mode');
let present_mode_switch = document.getElementById('present_mode_switch');


edit_mode_switch.addEventListener('click', function() {
	edit_mode.style.display = 'none';
	present_mode.style.display = 'block';
	viewPresent = new ViewPresent(model.items);
})

present_mode_switch.addEventListener('click', function() {
	present_mode.style.display = 'none';
	edit_mode.style.display = 'block';
})






let fullscreen_btn = document.getElementById('fullscreen_mode_btn');

fullscreen_btn.addEventListener('click', function() {
	if (document.fullscreen == false) {
		if (present_mode.webkitRequestFullScreen) {
			present_mode.webkitRequestFullScreen();
		} else if (present_mode.mozRequestFullScreen) {
			present_mode.mozRequestFullScreen();
		}
	} 

	else {
		if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
	}
});

document.addEventListener("webkitfullscreenchange", function() {
	let slide_area = document.getElementById('slide_area');
	let button_area = document.getElementById('button_area');

	if (document.fullscreen) {
		slide_area.style.position = 'absolute';
		//slide_area.style.margin = 0;
		slide_area.style.left = 0;
		slide_area.style.top = 0;
		slide_area.style.width = 100 +'%';
		slide_area.style.height = 100 +'%';

		button_area.style.position = 'absolute';
		button_area.style.margin = 0;
		button_area.style.left = 10 +'%';
		button_area.style.bottom = 10 +'px';
	}
	else {
		slide_area.style.position = 'relative';
		//slide_area.style.margin = 0;
		slide_area.style.left = '';
		slide_area.style.top = '';
		slide_area.style.width = 80 +'%';
		slide_area.style.height = 80 +'%';

		button_area.style.position = 'relative';
		button_area.style.margin = 'auto';
		button_area.style.left = '';
		button_area.style.bottom = '';
	}
})








window.onbeforeunload = function() {
	let items = JSON.stringify(model.items);
	let lines = JSON.stringify(model.lines);

	localStorage.setItem('items', items);
	localStorage.setItem('lines', lines);
}