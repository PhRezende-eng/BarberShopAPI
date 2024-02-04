## Barber Shop API
This is a API to server the app barber shop that can be found here: https://github.com/PhRezende-eng/BarberShop

## How to Install and Configure PostgresSQL
https://www.hostinger.com/tutorials/how-to-install-postgresql-on-ubuntu

Connecting to DB
```
$sudo -u postgres psql
```

Running migrations
```
$yarn prisma migrate dev
```

Running PG ADMIN
```
$sudo /usr/pgadmin4/bin/setup-web.sh
```

Create new password to get permission to create server on pgAdmin with:

```
ALTER USER postgres WITH PASSWORD 'new_password';
```

Insert this commando into psql terminal

# How to Use Node?


### Starting the project
Create a new dir to init your new NodeJS project.

```
$mkdir project_folder_name && cd project_folder_name
```

### Now start a node:
```
$yarn init -y
```
Now your dir may have a package.json file. We’ll use the express package to start, so, add express on project.

```
$yarn add express 
```

In the application root, create a new folder called src and inside it, create the file app.js

```
$mkdir src && touch src/app.js
```

Coding a minimal server
In the app.js let import the express and set up a minimal server response.

```
const express = require('express')
const app = express()
app.listen(3000)
```

And with only three lines, we already have our server running. But before the test, let’s add a response message with console.log, to let you see the message when the server started successfully.

```
const express = require('express')
const app = express()
app.listen(3000, ()=>console.log("Server is running at PORT 3000 🚀"))
```

### Creating routes
In app.js, let’s create our route for HTTP requests.

```
const express = require('express')
const app = express();

app.listen(3000, () => console.log("Server is running at PORT 3000 🚀 \n on http://localhost:3000"))

app.get('/api', (req, res) => {
    res.json({
        "data": "Hello World!",
        "statusCode": 200,
        "statusMessage": "ok",
    });
});
```

We’ve created a GET route, which means when our API receives a GET HTTP request, the client will receive the res.send response.

By default, every browser sends a GET request when you access some address. So, for testing, restart your application in the terminal and access in your browser the address:

http://localhost:3000

Great! In this post, we saw how to code and run a simple API server and created a route for request/response.

<!-- - Part 2 -->

### Add .gitignore file
Let’s add a .gitignore in root folder of project to avoid send node_modules and yarn.lock folder to git. Create a .gitignore file with this line:

```
yarn.lock
node_modules
```

### Folders and files structure
Create the main folders of our API aplication. Create these folders inside of src folder.

- controllers
- routes

Add these files in inside src folder:

- router.js
- server.js

### Set up app/server scope

Let’s separate the server from the application. This allows us to have a decoupled structure and will be useful for next steps to structure automated tests, temporary databases and other advantages.

Now, your app.js should seems like this:

```
const express = require('express')
// import our local router file
const routes = require('./routes')
// init express app
const app = express()
// allow express to work with json
app.use(express.json())
// router
app.use(routes)
// export app to import into server.js
module.exports = app
```

Note that we no longer have the routes and app.listen in this file.

### Set up server.js
The server now has the role of just initializing the application. Your server.js file should seems like this:

```
const app = require('./app')
const PORT = 3000
app.listen(PORT, () => console.log("Server is running at PORT 3000 🚀"))
```

Now, set up the routes. Inside routes folder, create a global.js file, and define some basic route.

```
const express = require('express')
const router = express.Router()
// your routes paths and methods
router.get('/api', (req, res) => { res.send('API online') })
module.exports = router
```

Now let’s import this routes file into our routes.js

```
const express = require('express')
const router = express.Router()
// your routes paths and methods
// single basic route at the base path of your application
router.get('/', (req, res) => { res.send('API online') })
module.exports = router
```

From now on, you must start your server with the command node src/server.js instead of src/app.js. Run your server and access the route http://localhost:3000 using your browser.


Note that we got the same result as part 1 of the article. But now in a structured and organized way. Let’s go deeper. Now, instead of passing the return function directly in the route, let’s leave that to the controllers. And each route calls your controller.

Inside controllers folder, create the file global.js. In this file, lets create a controller function:

```
const globalControllers = {
healthyCheck(req, res) { res.send('<h2>API is running</h2>') }
}
module.exports = globalControllers
```

Now, we need to import this controller into your route. So, in routes/global.js, lets import the controller and use it instead the function:

```
const express = require('express')
const router = express.Router()
const globalController = require('./controllers/global')
// your routes paths and methods
// single basic route at the base path of your application
router.get('/', globalController.healthyCheck) // we've changed this
module.exports = router
```

And now, you can restart your API and open, in your browser, the route http://localhost:3000 and you should get the message “API Online”.


# Let’s get started

Add TypeScript as a dev dependency
```
$yarn add typescript -D
```

Add @types for Typescript
```
$yarn add @types/node -D
```

Configure Typescript with tsconfig.json
Inside root directory, in your terminal, run:

```
$tsc --init
```

This may generate the tsconfig.json file. Let’s edit this config file to include the necessary option to run Typescript:

In tsconfig.json, in compiler options, change the option target from ES5 to ES6.


```
"target": "es6",
```

Setup npm script to run the server with typescript + watch file changes
First of all, let’s add the ts-node-dev lib to run in dev mode and watch file changes.

```
$yarn add ts-node-dev -D
```

In package.json, set up a custom script with these additional options:

- respawn: default command
- clear: Will clear screen (terminal) on restart
- ignore-watch: Files/folders to be ignored by node-dev
- transpile-only: Consider running this flag which is normal for dev workflow and will speed up things greatly.

In package.json, create the scripts options and add the dev command.

```
"scripts": {
   "dev": "ts-node-dev --respawn --clear --transpile-only --ignore-watch node_modules src/server.js"
},
```

Now you can run the server. Run from the root folder the command:

```
// if you use yarn
yarn dev
// if you use npm
npm run dev
```

After start the server, your terminal should seem like this:

At this moment you already have the typescript support, environment, and file watch in your application. That means now you don’t need to restart the server manually anymore. The — watch flag from ts-node will restart the server every time that a file change.

### Update javascript files to typescript.

Now that our. project supports typescript, let’s update the files extensions from javascript (.js) to typescript (.ts). Update the file extensions renaming the files of the following files:

- /src/app.js => app.ts
- /src/server.js => server.ts
- /src/routes.js => routes.ts
- /src/controllers/global.js => global.ts
- /src/routes/global.js => global.ts

Now your files should look like this:

### Refactoring / Updating the code

Note that your code editor probably warned you about some import/export and syntax issues. This is because now our project expects, in addition to typescript code, a modern syntax, such as import/export instead of require and module.exports. Lets fix it.

### Updating app.ts

When using typescript, if the lib doesn’t have built-in types, we need to add them separately. Let’s add the express types:

```
$yarn add @types/express -D
```

Change from require syntax to import syntax. Your app.ts code should look like this:

```
import express from 'express'
// import our local router file
import routes from './routes'
// init express app
const app = express()
// allow express to work with json
app.use(express.json())
// router
app.use(routes)
// export app to import into server.js
export default app
```

### Updating server.ts

Here the only thing we need to change is the require syntax to import. So, your server.ts file should look like this:

```
import app from './app'
const PORT = 3000
app.listen(PORT, () => console.log("Server is running at PORT 3000 🚀"))
```

### Updating routes.ts

Change the require syntax to import and change from module.exports to export default. Your routes.ts file should look like this:

```
import globalRoute from './routes/global'
const routes = [globalRoute]
export default routes
```

### Updating /controllers/global.ts

Change the module exports. And probably you code editor warning about req, res params types. For now, as we are not going to worry about the correct typing in this article, add the type any to them. After that, your code should look like this:

```
const globalControllers = {
healthyCheck(req: any, res: any) { res.send('<h2>API is running</h2>') }
}
export default globalControllers
```

### Updating /routes/global.ts

Change the require syntax to import and change from module.exports to export default. Your routes global.ts file should look like this:

```
import express from 'express'
import globalController from './../controllers/global'
const router = express.Router()
// your routes paths and methods
// single basic route at the base path of your application
router.get('/', globalController.healthyCheck)
export default router
```

### Update dev script in package.json

The dev command in scripts is trying to run the server.js file instead server.ts. So, let’s fix it. Your dev script should look like this:


```
"scripts": {
    "dev": "ts-node-dev --respawn --clear --transpile-only --ignore-watch node_modules src/server.ts"
  },
```

After that, your terminal should be look like this.

Now we have the server running, structured, supporting typescript and ES6 syntax and with automatic restart with file watch from ts-node-dev.

In the next articles, we will create routes, functionality, CRUDs, connect to MongoDB, create an authentication system and much more. See you in the next article, stay tuned!

# What CRUD API means?

The CRUD paradigm represents the four primitive database operations:CREATE, READ, UPDATE and DELETE.

So, with the term CRUD API we mean, the API which have the ability to create, read, update and delete entities from a database. In this tutorial, our entity is product.

Let’s get started
First of all, for you to understand the logic of data flow with express, let’s do a local CRUD without persisting the data.

Our API routes will be these:

- GET : api/product Get all products
- GET : api/product/id Get a specific product
- POST : api/product Create a new product
- PUT : api/product/id Update an existing product
- DELETE : api/product/id Delete an existing product

### Product Controller

Inside controllers, create a new file product.ts and inside it, let’s create all product controller functions.

Setup basic product controller.

```
// init a empty array of products
const products: any = []
// simulate id, init in 0
let id = 0;
const productControllers = {
// here we will add the product handling functions.
}
export default productControllers;
```

### List products

Inside productControllers object, add the new function called index.

```
 // list products
  index(req, res) {
    res.status(200).json({ status: 'success', data: { products } })
  },
```

### Create product
Inside productControllers object, add the new function called create.

```
  create(req, res) {
    // sums 1 to id
    id++
// get the body of the request and organize as a new product
    const product = {
      id, name: req.body.name, price: req.body.price
    }
    products.push(product)
    console.log('products', products)
    res.status(200).json({ status: 'success', message: 'Product created' })
  },
```

### Update product
Inside productControllers object, add the new function called update.

```
update(req, res) {
    const { id } = req.params
    const { name, price } = req.body
    const product = products.find(product => product.id == id)
    if (product) {
      product.name = name
      product.price = price
    }
console.log('products', products)
    res.status(200).json({ status: 'success', message: 'Product updated' })
  },
```

### Delete product
Inside productControllers object, add the new function called update.

```
 delete(req, res) {
    const { id } = req.params
    const product = products.find(product => product.id == id)
    if (product) {
      products.splice(products.indexOf(product), 1)
    }
    console.log(products)
    res.status(200).json({ status: 'success', message: 'Product deleted' })
  }
```

After adding all functions, your file should look like this:

```
// init a empty array of products
const products: any = []
// simulate id, init in 0
let id = 0;
const productControllers = {
// list products
  index(req, res) {
    res.status(200).json({ status: 'success', data: { products } })
  },
// create a new product
  create(req, res) {
    // sums 1 to id
    id++
// get the body of the request and organize as a new product
    const product = {
      id, name: req.body.name, price: req.body.price
    }
    products.push(product)
    console.log('products', products)
    res.status(200).json({ status: 'success', message: 'Product created' })
  },
  // update a product 
  update(req, res) {
    const { id } = req.params
    const { name, price } = req.body
    const product = products.find(product => product.id == id)
    if (product) {
      product.name = name
      product.price = price
    }
    console.log('products', products)
    res.status(200).json({ status: 'success', message: 'Product updated' })
  },

  delete(req, res) {
    const { id } = req.params
    const product = products.find(product => product.id == id)
    if (product) {
      products.splice(products.indexOf(product), 1)
    }
    console.log(products)
    res.status(200).json({ status: 'success', message: 'Product deleted' })
  }
}
export default productControllers;
```

### Products route
Inside routes folder, create a new file product.ts and inside it, create the routes methods.

```
import express from 'express'
// import product controller
import Product from './../controllers/product'
// init express router
const router = express.Router()
// get all products 
router.get('/product', Product.index)
// create a new product
router.post('/product', Product.create)
// update a product
router.put('/product/:id', Product.update)
// delete a product
router.delete('/product/:id', Product.delete)
export default router
Update router.ts
Inside src folder, update the file routes.ts, importing the product routes and add this into routes array.

import globalRoute from './routes/global'
import productRoute from './routes/product'
const routes = [globalRoute, productRoute] 
export default routes
```

### Restart the API server:

Testing the routes.

You can test the routes using your REST API Client preferred.

#### The most popular and common are:

The API Design Platform and API Client — Insomnia

Leading Open Source API Client, and Collaborative API Design Platform for REST, SOAP, GraphQL, and GRPC.

Postman API Platform | Sign Up for Free

Postman is an API platform for building and using APIs. Postman simplifies each step of the API lifecycle and streamlines collaboration so you can create better APIs — faster.

Thunder Client — Lightweight Rest API Client Extension for VS Code
Hand-crafted lightweight Rest Client for Testing APIs
Testing routes with CURL.

In the next article we will test our API with automated tests with JEST and Supertest. So, in this article for teaching purposes, we are going to test with CURL, but feel free to test in one of the REST API clients mentioned above.
