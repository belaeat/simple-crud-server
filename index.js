const express = require('express')
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

// these are middleware
app.use(cors())
// app.use(express.json()) use na korle req.body ta undefined thakbe
app.use(express.json())

// user and pass
// belaeat007
// HaYytlvI4RepHV9y

// code from mongoDB

const uri = "mongodb+srv://belaeat007:HaYytlvI4RepHV9y@cluster0.rrgajyt.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // connection with database
        const database = client.db("usersDB")
        const userCollection = database.collection("users")

        // ek line e likhle
        // const userCollection = client.db("usersDB").collection("users")

        // Reading user data
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray()
            res.send(result);
        });

        // finding an user to update user data
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const user = await userCollection.findOne(query)
            res.send(user)
        })

        // Creating user in database
        app.post("/users", async (req, res) => {
            const user = req.body
            console.log("new user", user)

            // inserting user information to db
            const result = await userCollection.insertOne(user);
            res.send(result)
        });

        // putting updateed data into server
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            // client side theke information receive korar jonno
            // error handle: req.body er pore () deya jabe na, error hobe
            const user = req.body;
            // client theke data pelam
            console.log(id, user)
            
            // data ke set korar kaj eikhane
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await userCollection.updateOne(filter, updatedUser, options)
            res.send(result)
        })

        // Deleting user data
        app.delete("/users/:id", async (req, res) => {
            // params diye id ta nibo
            const id = req.params.id;
            console.log("Please delete this id from database", id)

            // delete operation
            // error handle: id ta ke object diye wrap korte hobe, na hoy delete hobe na deletedcount 0 ashbe
            // error handle: ObjectId er age new boshate hobe, naile error dekhabe
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        });



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("SIMPLE CRUD IS RUNNING")
})

app.listen(port, () => {
    console.log(`SIMPLE CRUD IS RUNNING ON PORT, ${port}`)
})