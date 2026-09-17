## Setup and Installation

Please install from the `MAIN` branch, this is where all features are integrated. 

At this moment, this repo is does not come with a docker file, please run `npm install` to install needed dependencies.  

### For remote testing, locally run.

  One of the core testing dependencies is `mongodb-memory-server` (should be installed during the install command) this makes the testing scripts run on a temporary server so that redundant testing data  does not waste the limited space on the `mongodb-atlas` cloud server. 

  This testing is run through `npm test` powered by `vitest` please see `package-lock.json` for version information. Test files are found under `src/tests/product.test.ts`. This file tests all CRUD operations listed in the specifications of the document + other edge cases I thought were important. 


  At this point, it is good to run fresh after the clone and dependency installations. 


### For connecting to the remote database 

  This API is powered by MongoDB's free version of the Atlas database, it is a cloud hosted program giving us around half a gigabyte of storage. To connect, you will have to set up your `.env` file through this google drive link. (Accessible to anyone with a DLSU email account). Please install/copy the contents of the env especially the `MONGO_URI` section. 
  
  #### The `.env` file.

  There are only two fields used in this file, `PORT` and `MONGO_URI`. As the name suggests this is where you will put your PORT number, for MAC users I personally encountered a problem with port 3000 since sometimes apple-services run on that port I suggest changing it around to whatever works. `MONGO_URI` -- is given by the google drive link above.

  Please run `npm run build` command and check that a `dist/` directory has been created  


  The server should run with an `npm start` command 

## Architectural explanation 

### File Structure
  I chose to use the standard folder structure even with such a small project, this is to prevent future headaches with refactoring files in the case of this project growing. The standard structure also keeps it clean and makes it so that people who may be new to the repository can find things fast. 

              .
              ├── macky-merch-api
              │   ├── src
              │   │   ├── controller
              │   │   │   └── productController.ts 
              │   │   ├── interfaces 
              │   │   │   └── IProducts.ts
              │   │   ├── models
              │   │   │   └── products.ts
              │   │   ├── routes
              │   │   │   └── productRoutes.ts
              │   │   ├── tests
              │   │   │   ├── product.test.ts
              │   │   │   └── skuGen.ts
              │   │   └── util
              │   │       └── skuGenerator.ts
              │   ├── app.ts
              │   └── server.ts
              ├── README.md
              ├── package.json
              └── tsconfig.json

The code is contained within `/src` and divided into sub folders by their purpose.

`controller` files are who call `mongoose` to directly affect the database. These are all grouped by the same schema which is `products` 

`interfaces` are the special files needed by typescript, they give the prototype for a 'object' (not sure but, best way to describe it). Gives formal structure to the code. In this case we only deal with product objects. So IProducts.ts exists to define the fields under a product type and its defined data structure. (I realized that IProducts is not the reccommeded way of naming it, read the conventions late and found out it isnt really used in TS coding apologies). 

`models` where you define the structure of the data you are manipulating. 

`routes` -- i am not really a fan of crowding the app.ts so I put it under the routes and just group simillar routes together, `app.ts` refers to this when the request is going to `/api/products`. `productRoutes.ts` then calls on functions defined in `controller/productController.ts` to actually process the request. Keeps the code nice and readable, easier to debug too. 

`tests/` -- this is where i store the tests scripts for `vitest` to run. `skuGen.ts` is just a side script to test my `skuGenerator` function. 

`util` -- this is where I put in side functions that may be helpful somewhere else in this case it was just made for my 'skuGenerator'




### skuGenerator + extra added attributes -- experimental side feature for fun 

  As we were told to create 2 or more extra attributes for the product schema I came up with an sku. Although MongoDB creates an id for each created item, it isn't really useful to operations who may be dealing with it. My thought is that "LSCSHOOD-CLO-WHI-EXTR-1231" is much more memorable and helpful for operations when keeping track of orders and restock compared to an arbitrary "01283102" auto generated ID. 

  To accomplish this, I created a helper function that feeds on the attributes of the product object including variations(color and size) to automatically create the sku.

  The first six characters are the first six letters of the name, and in a case of multi word names it takes the first two word and takes the first three characters. The next is the first three letters of the category, then the first three letters of the color, and the first three letters of the size. And lastly, to further limit the chances of an SKU collision a random UUID is generated while taking the first four digits of it and making it the last few digits. 

  The generator takes note that color and size may be null so it will skip null fields. 

  This may aid in a filter search in the front end as I tried to make it as descriptive as possible meanwhile keeping it compact. 

#### extra attributes 

  I added these attributes with operations in mind, its more on to aid them and give more information during restocks and auditing.


  - description 
  - sku (required)
  - color 
  - size
  - isAvailable (defaults to true upon creation)
  
### Database

  The reason why I chose a NoSQL style databse is primarily because of its flexible nature, I saw this take home challenge as something that tests how cleanly you can make a backend system like this all while dealing with the time pressure. MongoDB has been my favorite go to database for works that need to be cleanly done taking minimal set up. I specifically went out of my way to use Atlas for it to be cloud based since I am not a fan of passing around database files (annoying to version track). So TLDR: MongoDB was flexible and I did not have the time to learn something new + the free cloud.  



  
### Challenges faced 

#### Testing

  I have never tried setting up a test script before so something new to try it too. However, through reading and searching around I eventually got it to work. Did make me realize how it easy it makes things later for simple checks if I ended up breaking something

#### Typescript adaptation
  I dont really have much hours on typescript but found out during the lscs deployment how much it makes life easier later on, I decided to take this opportunity to spend more time with it as well. However the set up was time consuming and had to read a bit of documentation to make it work. 

#### Lost a big part of my progress. 

  During the project I accidentally did something with my repo which made me lose a ton of progress. So I had to step back a bit and search around trying to salvage as much of it as possible, luckily with quite a bit of luck and checking out previous commits I was able to get everything back. 


#### Time Pressure
  
  I personally had a goal to finish this in around 5-6 hours due to the other take-home challenge that I have to do, so learning some new stuff and having to work fast was definitely a challenge and also with the fatigue of coding with no breaks definitely lead to some careless mistakes which I then wasted a few more precious time to debug haha. 




  
  

