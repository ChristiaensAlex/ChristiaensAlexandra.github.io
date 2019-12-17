'use strict';
let domHoliday, domLanden;
let ms = 1000;
const landen = { Belgium: 'BE', France: 'FR' };

// TO DO: formvalidation --> errormessage bij buttonklik

// #region ***********  Callback - HTML Generation (After select) ***********
// show________

const ShowLanden = function() {
	let html = '';
	for (let land of Object.keys(landen)) {
		html += `<option value="${land}">${land}</option>`;
	}
	domLanden.innerHTML = html;
	listenToSelect();
};

const showHolidays = function(data) {
	console.log(data);
	let html = '';
	let holidays = data.response.holidays;

	console.log(holidays);
	for (let holiday of holidays) {
		ms += 500;
		if (ms >= 5000) {
			ms = 5000;
		}
		console.log(holiday);
		let date = new Date(holiday.date.iso);
		date = date.toDateString();
		console.log(date);
		console.log(holiday.type[0]);
		let color = ShowColor(holiday.type[0]);
		let description = ShowDescription(holiday.description);
		console.log(color);
		html += `<div class="c-holiday moveit ${color}" style="animation: move ${ms}ms;">
    <div class=" c-holiday__date js-date">${date}</div>
    <div class=" c-holiday__name js-name">${holiday.name}</div>
    <div class="c-holiday__description js-description">${description}</div>
    
    

    
</div>`;
	}
	domHoliday.innerHTML = html;
	// domHoliday.classList.add(movecard);
};

const ShowColor = function(typeHoliday) {
	switch (typeHoliday) {
		case 'National holiday':
			return 'u-blue';
		// domHoliday.classList.add("u-blue");

		case 'Observance':
			return 'u-green';
		// domHoliday.classList.add("u-green");

		default:
			return 'u-red';
		// domHoliday.classList.add('u-red');
	}
};

const ShowDescription = function(description) {
	if (description != null) return description;
	else return 'No description available.';
};

// #region ***********  Data Access ***********
// get_______
const getHolidays = function(landcode) {
	handleData(`https://calendarific.com/api/v2/holidays?&api_key=b3e6a4f70d437e93c69279127448d1e29e385ebb&country=${landcode}&year=2019`, showHolidays);
};

// #region ***********  Event Listeners ***********
// listenTo________________

const listenToSelect = function() {
	console.log('aan het luisteren');
	domLanden.addEventListener('change', function() {
		let land = this.value;
		console.log(land);
		let landcode = landen[land];
		ms = 1000;
		getHolidays(landcode);
	});
};

const init = function() {
	console.log('dom loaded');
	// queryselectors ophalen
	domHoliday = document.querySelector('.js-holiday');
	domLanden = document.querySelector('.js-landen');
	// aanroepen functie om data op te halen
	// getHolidays();
	ShowLanden();
};
document.addEventListener('DOMContentLoaded', init);
