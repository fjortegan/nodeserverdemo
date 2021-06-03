// imports
const express = require("express");
const multer = require('multer');
const { Sequelize, Model, DataTypes } = require('sequelize');

// creates node app
const app = express();

const sequelize = new Sequelize('mariadb://admin:node@localhost:3306/node')
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

class User extends Model {}

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

(async () => {
  await sequelize.sync({ force: true });
  const u1 = User.build({name: 'Cabesa', age: 23});
  await u1.save();
  //console.log(u1);
})();
//User.sync({ force: true });



// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
upload = multer();


// entrypoints
app.post('/user/', function (req, res) {
  const newUser = User.build(req.body);
  newUser.save();
  res.status(200).send(newUser);
});

app.get('/user/', function (req, res) {
  (async () => {
    const users = await User.findAll();
    res.send(users);
  })();
});

app.put('/user/', function (req, res) {
  // pendiente actualizar
  //const newUser = User.build(req.body);
  //newUser.save();
  res.status(200);
});

app.delete('/user/:id', function (req, res) {
  (async () => {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200);
  })();
});

// port config
app.listen(3000, () => {
 console.log("Server listening at port: 3000");
});
