# Setup and Installation

Please install from the `MAIN` branch, as this is where all features are integrated.

At this moment, this repo does not come with a Dockerfile. Please run the following command to install the needed dependencies:

```bash
npm install
```

## For Remote Testing

Locally run the following command for testing:

```bash
npm test
```

One of the core testing dependencies is `mongodb-memory-server` (which should be installed during the installation command). This makes the testing scripts run on a temporary server, so redundant testing data does not waste the limited space on the MongoDB Atlas cloud server.

This testing is powered by Vitest. Please see `package-lock.json` for version information. Test files are found under:

```text
src/tests/product.test.ts
```

This file tests all CRUD operations listed in the specifications document, along with other edge cases I thought were important.

At this point, it is good to run the tests fresh after cloning the repository and installing the dependencies.

## Connecting to the Remote Database

This API is powered by MongoDB's free version of Atlas, a cloud-hosted database service giving us around half a gigabyte of storage.

To connect, you will have to set up your `.env` file through this Google Drive link. It is accessible to anyone with a DLSU email account. Please install or copy the contents of the `.env` file, especially the `MONGO_URI` section.

Link: https://drive.google.com/drive/folders/1uVFlyDwtdJJYr9SqvuOtfxr0OOnUfA-C

### The `.env` File

There are only two fields used in this file:

```env
PORT=
MONGO_URI=
```

As the name suggests, `PORT` is where you will put your desired port number. For Mac users, I personally encountered a problem with port 3000 since sometimes Apple services run on that port. I suggest changing it to whatever works.

`MONGO_URI` is provided through the Google Drive link above.

Please run the build command and check that a `dist/` directory has been created:

```bash
npm run build
```

The server should run with the following command:

```bash
npm start
```

# Architectural Explanation

## File Structure

I chose to use the standard folder structure even with such a small project. This is to prevent future headaches with refactoring files in case this project grows. The standard structure also keeps things clean and makes it easier for people who may be new to the repository to find things quickly.

```text
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
```

The code is contained within `/src` and divided into subfolders based on their purpose.

`controller` files are responsible for calling Mongoose to directly affect the database. These are all grouped by the same schema, which is `products`.

`interfaces` are the special files needed by TypeScript. They give the prototype for an object (not sure, but this is the best way to describe it). They give formal structure to the code. In this case, we only deal with product objects, so `IProducts.ts` exists to define the fields under a product type and its defined data structure.

(I realized that `IProducts` is not the recommended way of naming it. I read the conventions later and found out it isn't really used in TypeScript coding. Apologies.)

`models` are where you define the structure of the data you are manipulating.

`routes` -- I am not really a fan of crowding `app.ts`, so I put the routes under their own folder and grouped similar routes together. `app.ts` refers to this when the request is going to `/api/products`. `productRoutes.ts` then calls functions defined in `controller/productController.ts` to actually process the request.

This keeps the code nice and readable and makes it easier to debug.

`tests/` -- this is where I store the test scripts for Vitest to run. `skuGen.ts` is just a side script to test my `skuGenerator` function.

`util` -- this is where I put side functions that may be helpful somewhere else. In this case, it was just made for my `skuGenerator`.

## skuGenerator + Extra Added Attributes -- Experimental Side Feature for Fun

As we were told to create two or more extra attributes for the product schema, I came up with an SKU.

Although MongoDB creates an ID for each created item, it isn't really useful to operations teams who may be dealing with it. My thought is that `"LSCSHOOD-CLO-WHI-EXTR-1231"` is much more memorable and helpful for operations when keeping track of orders and restocking compared to an arbitrary `"01283102"` auto-generated ID.

To accomplish this, I created a helper function that feeds on the attributes of the product object, including variations (color and size), to automatically create the SKU.

The first six characters are the first six letters of the name. In the case of multi-word names, it takes the first two words and takes the first three characters from each. The next is the first three letters of the category, then the first three letters of the color, and the first three letters of the size.

Lastly, to further limit the chances of an SKU collision, a random UUID is generated while taking the first four digits of it and making them the last few digits.

The generator takes note that color and size may be null, so it will skip null fields.

This may aid in filtering searches in the frontend, as I tried to make it as descriptive as possible while keeping it compact.

### Extra Attributes

I added these attributes with operations in mind. They are mainly intended to aid operations and provide more information during restocks and auditing.

* `description`
* `sku` (required)
* `color`
* `size`
* `isAvailable` (defaults to true upon creation)

# Database

The reason why I chose a NoSQL-style database is primarily because of its flexible nature. I saw this take-home challenge as something that tests how cleanly you can make a backend system like this while dealing with time pressure.

MongoDB has been my go-to database for work that needs to be cleanly done with minimal setup. I specifically went out of my way to use Atlas so that it could be cloud-based, since I am not a fan of passing around database files (annoying to version track).

So TLDR: MongoDB was flexible, and I did not have the time to learn something new + the free cloud.

# Challenges Faced

## Testing

I have never tried setting up a test script before, so this was something new to try. However, through reading and searching around, I eventually got it to work.

It did make me realize how easy it makes things later for simple checks if I ended up breaking something.

## TypeScript Adaptation

I don't really have much experience with TypeScript, but I found out during the LSCS deployment how much it makes life easier later on. I decided to take this opportunity to spend more time with it as well.

However, the setup was time-consuming, and I had to read a bit of documentation to make it work.

## Lost a Big Part of My Progress

During the project, I accidentally did something with my repo that made me lose a ton of progress. So I had to step back a bit and search around, trying to salvage as much of it as possible.

Luckily, with quite a bit of luck and checking out previous commits, I was able to get everything back.

## Time Pressure

I personally had a goal to finish this in around 5–6 hours due to the other take-home challenge that I had to do.

Learning some new stuff while having to work fast was definitely a challenge. Coding with no breaks and the fatigue that came with it definitely led to some careless mistakes, which then wasted a few more precious hours debugging, haha.


  
  

