const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false // by default sequelize will output the SQL command it makes to the database. here we're turning off the console logging.
});
// here we are connecting sequelize to the "currently running database process"

// three arguments for define: first is the name of the table, second is an object which contains the column headers, and third is an object passing more options into the table
const Page = db.define('page', {
  // second arg
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
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
  },
// Karen likes this way of writing getterMethods, I think I do too. 
//   route: {
//     type: Sequelize.VIRTUAL,
//     get() {
  //      return '/wiki/' + this.urlTitle
//     }
//   }
}, { // third arg
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle
      // making a new url title
    }
  },
    hooks: {
      beforeValidate: generateUrlTitle = (page) => {
        if (page.title) {
          // Removes all non-alphanumeric characters from title
          // And make whitespace underscore
          page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
        } else {
          // Generates random 5 letter string
          page.urlTitle = Math.random().toString(36).substring(2, 7);
        }
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

// here we are establishing a connection that describes that a page has one user associated with it and that info will be established on the pages table rows. when we run this, we add a new column to the page table called "author" that references the related user (by ID)
Page.belongsTo(User, {as: 'author'});


module.exports = {
  db: db,
  Page: Page,
  User: User
}
