const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// username: dbuser1
// pass: yDzi42kaWpY7gYg

const uri = "mongodb+srv://dbuser1:yDzi42kaWpY7gYg@cluster0.cn0mdvb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try{
        const userCollection = client.db('Simple-node-server').collection('users');

        app.get('/users', async(req, res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async(req, res)=> {
            const user = req.body;
            console.log(user)
            const  result = await userCollection.insertOne(user)
            // console.log(result)
            res.send(result)  
        })

        // deleted method api
        app.delete('/users/:id', async(req, res)=> {
            const id = req.params.id;
            // console.log('trying to id', id)
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result)

        })
    }
    finally{
        // alert('successfully added');
    }
}
run().catch((error)=> {
    console.log(error)
})





app.get('/', (req, res)=> {
    res.send('HELLOW, I AM RURNING PORT 5000')
})

// app.get('/users', async(req, res)=>{
//     const query = {};
//     const cursor = userCollection
// })





app.listen(port, ()=> {
    console.log('database connected')
})