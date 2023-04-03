const http = require('http');
const url = require('url');
const crypto = require('crypto');
const { MongoClient, ObjectId } = require('mongodb');


const uri = "mongodb+srv://rutubha:rutubha@cluster0.c9davph.mongodb.net/crud?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const createConnection = async () => {
    try {
        client.connect();
        console.log("Connect to MongoDB");
    } catch (error) {
        console.log("Error : " + error);
    }
}

createConnection().catch(console.err);
const collection = client.db("crud").collection("user");
collection.createIndex({ email: 1 }, { unique: true , retryWrites: null}, (err) => {
    if (err) {
        if(err.code === 11000) {
            console.error('A duplicate Index has occured ', err.message);
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Bad Reequest');
        } else {
            throw err;
        }
    }
    console.log("Indexed Create on Email field " + result);
});



/* ----------------------------------------------------- Run the server ---------------------------------------------------------- */
const app = http.createServer(async (req, res) => {

    try {

        let method = req.method; //method
        let path = req.url.split("?")[0]; //url
 

        /* ___Get the data from the request and create user___ */
        if (method == "POST" && path == "/user") {

            /* ------------------- Get body Data ------------------- */
            var body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', () => {
                body = JSON.parse(body);

                /* --------- hmac object to hash the password ----------- */
                const hMac = crypto.createHmac('sha256', 'kNfoh6U3AsTuzz16zeYbBwe8jpMn4/Hol9u2sukOB4g');
                hMac.update(body.password);
                const password = hMac.digest('hex');

                try {
                    //Promise
                    createUser(collection, { ...body, DOB: new Date(body.DOB), password, admin: false })
                        .then(result => {
                            res.end(JSON.stringify(result));
                        })
                        .then(error => {
                            if(error?.code === 11000) {
                                res.end("Bad request");
                            }
                        }); //user Created
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error ');
                }
            });
        }

        /* ___Get the data from the request and create admin___ */
        if (method == "POST" && path == "/admin") {

            /* ------------------- Get body Data ------------------- */
            var body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', () => {
                body = JSON.parse(body);

                /*  hmac object to hash the password */
                const hMac = crypto.createHmac('sha256', 'kNfoh6U3AsTuzz16zeYbBwe8jpMn4/Hol9u2sukOB4g');
                hMac.update(body.password);
                const password = hMac.digest('hex');

                try {
                    createUser(collection, { ...body, DOB: new Date(body.DOB), password, admin: true })
                    .then(result => {
                        res.end(JSON.stringify(result));
                    })
                    .then(error => {
                        
                    }); //user Created
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error ');
                }
            });
        }


        /* ___Login the user___ */
        if (method == "POST" && path == "/login") {
            /* ------------------- Get body Data ------------------- */
            var body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', () => {
                body = JSON.parse(body);

                /*  hmac object to hash the password */
                const hMac = crypto.createHmac('sha256', 'kNfoh6U3AsTuzz16zeYbBwe8jpMn4/Hol9u2sukOB4g');
                hMac.update(body.password);
                const password = hMac.digest('hex');

                try {
                    login(collection, body.email, password).then(id => {
                        res.setHeader('Set-Cookie', `_id=${id}`);
                        res.end("Login succesfull");
                    }).then(error => {
                        console.log(error);
                    });
                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error ');
                }
            });
        }


        /* ___ Get All data if it is admin___ */
        if (method == "GET" && path == "/users") {
            const id = req.headers.id;
            isAdmin(collection, new ObjectId(id)).then(result => {
                if (result) {
                    getAllData(collection).then(result => {
                        res.setHeader('Content-Type', 'application/json');
                        console.log("Get All Data " + result)
                        res.end(JSON.stringify(result));
                    }).then(error => {

                    })
                } else {
                    res.end('You are not authorized');
                }
            })
        }


        /* ___Get the user information_____ */
        if (method == "GET" && path == "/user") {
            const query = url.parse(req.url, true).query;
            const loginId = new ObjectId(req.headers.id);
            try {
                findById(collection, new ObjectId(query.id))
                .then(result => {
                    res.setHeader('Conten-Type', 'application/json');
                    res.end(JSON.stringify(result));
                })
                .then(error => {
                    res.end(JSON.stringify(error));
                });
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error ');
            }
        }


        /* ____Update the user________ */
        if (method == "PUT" && path == "/user") {

            /* ------------------- Get body Data ------------------- */
            var body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            }).on('end', () => {
                body = JSON.parse(body);
                const query = url.parse(req.url, true).query;
                updateById(collection, new ObjectId(query.id) , { ...body, DOB: new Date(body.DOB) })
                .then(result => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                })//user updated
            });
        }

        /* ___delete the user_____ */
        if (method == "DELETE" && path == "/user") {
            const query = url.parse(req.url, true).query;
            try {
                deleteById(collection, new ObjectId(query.id))
                .then(result => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(result));
                })
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error ');
            }
        }

    } catch (error) {
        console.error(error);

        //500 Internal Server Error response
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});
app.listen(8080);







/* -------------------- Creating a user ----------------- */
const createUser = async (collection, userData) => {
    const result = await collection.insertOne(userData, );
    console.log(`New user created with the following id: ${result.insertedId}`);
    console.log(`New user : ${result}`);
    return result;
}

/* -------------------------- Getting user ----------------------- */
const findById = async (collection, id) => {
    const result = await collection.findOne({ _id: id });
    if (result) {
        console.log(`Found a listing in the collection with the id ${id}: `);
        console.log(result);
        return result;
    } else {
        console.log((`No listing found with the name ${id}`));
    }
}


/* -------------------------- Login user ----------------------- */
const login = async (collection, emailOfUser, password) => {
    const result = await collection.findOne({ email: emailOfUser });
    if (result && result.password == password) {
        // console.log(`Found a listing in the collection with the name ${emailOfUser}: `);
        console.log(result);
        console.log("Login successful!!!");
        return result._id;
    } else {
        console.log((`No listing found with the name ${emailOfUser}`));
        return false;
    }
}

/* --------------------- is admin ? ------------------- */
const isAdmin = async (collection, id) => {
    const result = await collection.findOne({ _id: id });
    console.log(result);
    if (result && result.admin) {
        return true;
    }
    return false;
}


/* ------------------------------ Get all user if he/she is admin ------------------- */
const getAllData = async (collection) => {
    const result = await collection.find({ name: { $regex: /[a-z]*/i } }).toArray((err, result) => {
        console.log(result);
        return result;
    });
    return result;
}


/* ----------------------------- Update user ------------------------------ */
const updateById = async (collection, id, updateListing) => {
    const result = await collection.updateOne(
        { _id: id },
        { $set: updateListing }
    );
    console.log(`${result.matchedCount} documents(s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents(s) was/were updated`);
    return result;
}


/* ------------------------- Delete User --------------------------------- */
const deleteById = async (collection, id) => {
    const result = await collection.deleteOne({
        _id: id
    });

    console.log(`${result.deletedCount} document(s) was/were deleted`);

    return result;
}
