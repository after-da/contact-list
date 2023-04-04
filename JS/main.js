$(document).ready(function () {
	$('#telefono').mask('000-000-0000');
});
let txtNombre = document.getElementById('txtNombre');
txtNombre.focus();

const app = new Vue({
	el: '#app',
	data: {
		titulo: 'Agenda Pro',
		contactos: [],
		contactoNombre: '',
		contactoTelefono: '',
		contactoInsta: '',
		seleccionado: false,
	},
	methods: {
		limpiar: function () {
			this.contactoNombre = '';
			this.contactoTelefono = '';
			this.contactoInsta = '';
		},
		// -- AGREGAR --
		agregarContacto: function () {
			//Validaciones
			if (
				this.contactoNombre === '' ||
				this.contactoTelefono === '' ||
				this.contactoInsta === ''
			) {
				alert('¡Todos los campos son requeridos!');
			} else {
				this.contactos.push({
					nombre: this.contactoNombre,
					telefono: this.contactoTelefono,
					insta: this.contactoInsta,
				});

				this.limpiar();
				localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
				let txtNombre = document.getElementById('txtNombre');
				txtNombre.focus();
			}
		},
		// -- MOSTRAR --
		mostrarContacto: function (index) {
			if (this.contactoNombre === '') {
				document.getElementById('boton-submit').disabled = true;
				this.contactos[index].seleccionado = true;
				this.contactoNombre = this.contactos[index].nombre;
				this.contactoTelefono = this.contactos[index].telefono;
				this.contactoInsta = this.contactos[index].insta;
			} else {
				this.editarContacto(index);
				this.contactos[index].seleccionado = false;
				document.getElementById('boton-submit').disabled = false;
			}
		},
		// -- EDITAR --
		editarContacto: function (index) {
			this.contactos[index].nombre = this.contactoNombre;
			this.contactos[index].telefono = this.contactoTelefono;
			this.contactos[index].insta = this.contactoInsta;
			this.btnEdicion = 'Editar';
			this.limpiar();

			localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
		},
		// -- ELIMINAR --
		eliminar: function (index) {
			this.contactos.splice(index, 1);
			localStorage.setItem('agenda-pro', JSON.stringify(this.contactos));
		},
	},
	// -- GUARDAR EN LOCAL --
	created: function () {
		let datosDB = JSON.parse(localStorage.getItem('agenda-pro'));
		console.log(datosDB);

		if (datosDB === null) {
			this.contactos = [];
		} else {
			this.contactos = datosDB;
		}
	},
});
