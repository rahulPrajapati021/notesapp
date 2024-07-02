const User = require('./User')
const Note = require('./Note')


//defining association

User.hasMany(Note, {onDelete: 'CASCADE'})
Note.belongsTo(User) 


User.sync()
Note.sync()

module.exports = {User, Note}
