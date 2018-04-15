// Modelo Usuario para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Campos que vamos a guardar en la base de datos
var DriverSchema = new Schema({
	name				: String, // Nombre del usuario
	phone				: String,
	plate				: String,
	email				: String,
	status				: String,
	phone				: String,
	phone				: String,
	phone				: String,
	phone				: String,
	photo			 : String, // Avatar o foto del usuario
	createdAt	 : {type: Date, default: Date.now} // Fecha de creación
});

// Exportamos el modelo 'Driver' para usarlo en otras
// partes de la aplicación
var Driver = mongoose.model('Driver', DriverSchema);
