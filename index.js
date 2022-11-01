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

        // CRUD ER ...R == READ API KORA HOLO
        app.get('/users', async(req, res)=>{
            const query = {};
            // console.log(query)
            const cursor = userCollection.find(query);
            // console.log(cursor)
            const users = await cursor.toArray();
            res.send(users)
        })

// ইউজার মধ্যে আইড়ি দিয়ে তাকে ফাইন্ড করে তার সকল তথ্য নিয়ে আসার জন্য MONGODB findOne নামে একটি অপারেশন চালায়। 
        app.get('/users/:id', async(req, res)=> {
            const id = req.params.id;
            const query =  {_id: ObjectId(id)};
            // console.log(query)
            const result = await userCollection.findOne(query);
            // console.log(result)
            res.send(result)
        })


        
        // crud er = C . ER MAINING HOSCCE CREATE KORA...TAI AKHANE CREATE API KORA HOLO...>
        app.post('/users', async(req, res)=> {
            const user = req.body;
            console.log(user)
            const  result = await userCollection.insertOne(user)
            // console.log(result)
            res.send(result)  
        })

        // update user info put method
        app.put('/users/:id', async(req, res)=> {
            const id= req.params.id;
            const filter = {_id: ObjectId(id)};
            const user = req.body;
            // console.log(user)
            const option = {upsert: true};
            const updateUser = {
                $set: {
                    name: user.name,
                    address: user.address,
                    email: user.email
                }
            }
            const result = await userCollection.updateOne(filter, updateUser, option);
            console.log(result)
            res.send(result)
        })

        // deleted method api 
        app.delete('/users/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result)
        })
    }
    catch{(error)=> {
        console.log(error.message)
    }}
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
    console.log('server is connected')
})