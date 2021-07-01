// Assets
var models = [
	{
		url: './assets/magnemite/scene.gltf',
		scale: '0.5 0.5 0.5',
		info: 'Magnemite, Lv. 5, HP 10/10',
		rotation: '0 180 0',
	},
	{
		url: './assets/articuno/scene.gltf',
		scale: '0.2 0.2 0.2',
		rotation: '0 180 0',
		info: 'Articuno, Lv. 80, HP 100/100',
	},
	{
		url: './assets/dragonite/scene.gltf',
		scale: '0.08 0.08 0.08',
		rotation: '0 180 0',
		info: 'Dragonite, Lv. 99, HP 150/150',
	},
];

// Current displayed asset
var modelIndex = 0;

function getPlaces() {
	// https://www.latlong.net/
	return [
		{ name: 'Argentino', location: { lat: 45.805893, lng: 13.509980, } },
		{ name: 'PCR1', location: { lat: 45.911497, lng: 13.333447, } },
		{ name: 'PCR2', location: { lat: 45.910754, lng: 13.334037, } },
	];
}

function setModel(model, entity) {
	if( !model || !entity ) return;

	if (model.scale) {
		entity.setAttribute('scale', model.scale);
	}

	if (model.rotation) {
		entity.setAttribute('rotation', model.rotation);
	}

	if (model.position) {
		entity.setAttribute('position', model.position);
	}

	entity.setAttribute('gltf-model', model.url);

	const div = document.querySelector('.instructions');
	div.innerText = model.info;
};



function renderPlaces(places) {
	let scene = document.querySelector('a-scene');
	let currentModel = models[modelIndex];

	places.forEach((place) => {
		let latitude = place.location.lat;
		let longitude = place.location.lng;

		let modelTag = document.createElement('a-entity');
		modelTag.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

		setModel(currentModel, modelTag);

		modelTag.setAttribute('animation-mixer', '');

		scene.appendChild(modelTag);
	});
}



window.onload = () => {
	const button = document.querySelector('button[data-action="change"]');
	button.innerText = '﹖';

	let places = getPlaces();
	renderPlaces(places);

	document.querySelector('button[data-action="change"]').addEventListener('click', function () {
		let entity = document.querySelector('[gps-entity-place]');

		modelIndex = (modelIndex+1) % models.length;
		let currentModel = models[modelIndex];

		setModel(currentModel, entity);
	});

};


