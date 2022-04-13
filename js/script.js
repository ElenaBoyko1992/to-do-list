//Настройки Gulp - проверка поддержки webp, добавление класса webp или no-webp для HTML

//Проверка поддержки webp
function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
};
//Добавление класса webp или no-webp для HTML
testWebP(function (support) {
	let className = support === true ? 'webp' : 'no-webp';
	document.documentElement.classList.add(className);
});


/*основной код==============================================================*/

let formForNote = document.forms[0];
let textInput = formForNote.textInput;
let noteButton = document.querySelector('.header-page__button');

function addNote() {
	if (textInput.value) {
		// создаем общий блок заметки
		let note = document.createElement('div');
		let pageItems = document.querySelector('.page__items');
		pageItems.append(note);
		note.classList.add('page__item', 'item-page');

		// создаем блок в заметке для текста
		let textBlock = document.createElement('div');
		note.append(textBlock);
		textBlock.classList.add('item-page__text-block');
		textBlock.innerHTML = textInput.value;
		textInput.value = ""; //очищаем input после нажатия на кнопку "note"

		// создаем блок с кнопками
		let buttonsBlock = document.createElement('div');
		note.append(buttonsBlock); //вставляем его в общий блок заметки
		buttonsBlock.classList.add('item-page__buttons-block');

		//в блоке с кнопками создаем кнопки "Задача выполнена" и "Удалить задачу" 
		let doneButton = document.createElement('div');
		let deleteButton = document.createElement('div');
		buttonsBlock.append(doneButton, deleteButton);
		doneButton.classList.add('item-page__done-button');
		deleteButton.classList.add('item-page__delete-button');

		//зачеркиваем текст при нажатии на кнопку "Задача выполнена"
		doneButton.addEventListener("click", function () {
			textBlock.classList.toggle('line-through');
		});

		//удаляем заметку при нажатии на кнопку "Удалить задачу"
		deleteButton.addEventListener("click", function () {
			note.remove();
		});

	};
}

noteButton.addEventListener("click", addNote);

textInput.addEventListener("keydown", function () {
	if (event.key === 'Enter') {
		addNote();
	};
});