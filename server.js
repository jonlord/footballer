const express = require('express')
const ejs = require('ejs')
const container = require('./container')
const router = require('express-promise-router')();

container.resolve(function(users) {
  const app = setupExpress();

  function setupExpress() {
      const app = express();
      app.listen(3000, function() {
        console.log('Example app listening on port 3000!')
      });

      configureExpress(app);

      users.setRouting(router);
      app.use(router);
  }

  function configureExpress(app) {
    app.use(express.static('public'));
    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded({extended: true  }));
  }

})

// app.get('/', (req, res) => res.send('Hello World!'))
