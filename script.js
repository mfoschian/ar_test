
window.onload = () => {
	const button = document.querySelector('button[data-action="change"]');
	button.innerText = '﹖';

	let places = staticLoadPlaces();
	renderPlaces(places);
};

function staticLoadPlaces() {
	/*
		https://www.latlong.net/


		Argentino: 45.805893,13.509980
		PCR (dietro):	45.911497,13.333447
		PCR (mosaico): 45.910754,13.334037
	*/
	return [
		{
			name: 'Argentino', location: { lat: 45.805893, lng: 13.509980, },
			name: 'PCR1', location: { lat: 45.911497, lng: 13.333447, },
			name: 'PCR2', location: { lat: 45.910754, lng: 13.334037, },
		},
	];
}

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

var modelIndex = 0;
var setModel = function (model, entity) {
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

	places.forEach((place) => {
		let latitude = place.location.lat;
		let longitude = place.location.lng;

		let model = document.createElement('a-entity');
		model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

		setModel(models[modelIndex], model);

		model.setAttribute('animation-mixer', '');

		document.querySelector('button[data-action="change"]').addEventListener('click', function () {
			var entity = document.querySelector('[gps-entity-place]');
			modelIndex++;
			var newIndex = modelIndex % models.length;
			setModel(models[newIndex], entity);
		});

		scene.appendChild(model);
	});
}
