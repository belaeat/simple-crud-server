/**
 * -----------------------------------
 *          MongoDB Connection
 * -----------------------------------
 * 
 * 1. CREATE ACCOUNT
 * 2. CREATE AN USER WITH PASSWORD
 * 3. Whitelist IP Address
 * 4. database > connect > driver > node.js > show all code
 * 5. Change the password in the uri
 * 
 * ------------------------------------
 *          CREATE --- POST
 * ------------------------------------
 * 1. app.get("/users", async(req, res) => {})
 * 2. Make the function async to use await inside it
 * 3. Make sure you use the express.json() middleware
 * 4. access data from the body: const user = req.body
 * 5. const result = await userCollection.insertOne(user)
 * 6. res.send(result)
 * 
 * -------------------------------------
 *              Client Side
 * -------------------------------------
 * 1. create fetch
 * 2. add second parameter as an object
 * 3. provide method: "POST"
 * 4. add header: {'content-type': 'application/json'}
 * 5. add body: JSON.stringify(user)  
 * 
 *
 * -------------------------------------
 *                  READ MANY
 * -------------------------------------
 * 1. create a cursor = userCollection.find()
 * 2. const result = await cursor.toArray()
 * 
 * 
 * -------------------------------------
 *               DELETE
 * -------------------------------------
 * 1. create app.delete('/users/:id', async(req, res) =>{})
 * 2. specify unique ObjectId to delete the right user
 * 3. const query = {_id: new ObjecId(id)}
 * 4. const result = await userCollection.deleteOne(query)
 * 
 * ---------Client Side-------------
 * 1. create dynamic url with id
 * 2. mention the delete method
 * 
 * 
 * **/