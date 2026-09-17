## Setup and Installation

At this moment, this repo is does not come with a docker file, please run `npm install` to install needed dependencies.  

### For remote testing, locally run.

  One of the core testing dependencies is `mongodb-memory-server` this makes the testing scripts run on a temporary server so that redundant information does not waste the limited `mongodb-atlas` cloud server. 

  This testing is run through `npm test` powered by `vitest` please see `package-lock.json` for more information. Test files are found under `src/tests/product.test.ts`. This file tests all CRUD operations listed in the specifications of the document + other edge cases I thought were important. 

  At this point, it is good to run fresh after clone and dependency installations. 

### For connecting to the remote mongodb-atlas
