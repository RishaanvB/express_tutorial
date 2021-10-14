var mongoose = require('mongoose');
const { DateTime } = require('luxon');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  var lifetime_string = '';
  const format_date = (dob) =>
    DateTime.fromJSDate(dob).toLocaleString(DateTime.DATE_MED);
  this.date_of_birth
    ? (lifetime_string = format_date(this.date_of_birth))
    : (lifetime_string += 'Unknown');
  lifetime_string += ' - ';
  this.date_of_death
    ? (lifetime_string = format_date(this.date_of_death))
    : (lifetime_string += 'Unknown');

  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
