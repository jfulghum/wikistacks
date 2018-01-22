const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false // by default sequelize will output the SQL command it makes to the database. here we're turning off the console logging.
});
// here we are connecting sequelize to the "currently running database process"

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isURL: true
    }
  },
  content: {
    type: Sequelize.TEXT, // text here b/c "text" has an unlimited amount of characters whereas "string" has 255 char limit
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')// if the values are defined e.g. a picklist
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: { // correct?
    route: function() {
      return '/wiki/' + this.urlTitle
    }
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
   }
});


module.exports = {
  db: db,
  Page: Page,
  User: User
}
