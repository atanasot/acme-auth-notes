const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const config = {
  logging: false
};

if(process.env.LOGGING){
  delete config.logging;
}
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db', config);

const User = conn.define('user', {
  username: STRING,
  password: STRING
});

User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    const hashed = await bcrypt.hash(user.password, 3);
    user.password = hashed;
  }
});

User.byToken = async(token)=> {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(payload.id, {
      attributes: {
        exclude: ['password']
      }
    });
    if(user){
      return user;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  catch(ex){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

// find user in system, does compare with bcrypt
User.authenticate = async({ username, password })=> {
  const user = await User.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password) ){
    return jwt.sign({ id: user.id}, process.env.JWT); 
  }
  const error = Error('bad credentials!!!!!!');
  error.status = 401;
  throw error;
};

// we need to create Note model
// seed some notes and be able to get them
// add a form to insert some notes

const Note = conn.define('note', {
  text: STRING
})

Note.belongsTo(User)  // userId on notes
User.hasMany(Note)

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const credentials = [
    { username: 'lucy', password: 'lucy_pw'},
    { username: 'moe', password: 'moe_pw'},
    { username: 'larry', password: 'larry_pw'}
  ];
  const [lucy, moe, larry] = await Promise.all(
    credentials.map( credential => User.create(credential))
  );
  const lucyNote = await Note.create({text: 'note for lucy', userId : lucy.id})
  const moeNote = await Note.create({text: 'note for moe', userId: moe.id})
  const larryNote = await Note.create({text: 'note for larry', userId: larry.id})


  return {  // do i need to return here
    users: {
      lucy,
      moe,
      larry
    }
  };

  

};

module.exports = {
  syncAndSeed,
  models: {
    User,
    Note
  }
};
