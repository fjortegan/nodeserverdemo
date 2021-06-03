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

sequelize.sync({ force: true })
          .then(result => {
            const u1 = User.build({name: 'Cabesa', age: 23});
            u1.save();
          });



// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing multipart/form-data
upload = multer();


// entrypoints
app.post('/user/', function (req, res) {
  User.create(req.body)
    .then(newUser => {res.send(newUser);})
    .catch(err => console.log(err));

});

app.get('/user/', function (req, res) {
  User.findAll()
    .then(users => {res.send(users);})
    .catch(err => console.log(err));
});

app.put('/user/', function (req, res) {
  User.update(req.body, {
    where: { id: req.body.id }
    })
    .then(result => {res.send({updated: result[0]});})
    .catch(err => {console.log(err)});
});

app.delete('/user/:id', function (req, res) {
  User.destroy({
    where: { id: req.params.id }
    })
    .then(result => {res.send({deleted: result});})
    .catch(err => {console.log(err)});
});

// port config
app.listen(3000, () => {
 console.log("Server listening at port: 3000");
});
