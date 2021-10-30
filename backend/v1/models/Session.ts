export {};
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SessionSchema = new Schema(
	{ _id: String, session: String },
	{ strict: false }
);
const Session = mongoose.model('sessions', SessionSchema, 'sessions');

module.exports = Session;
