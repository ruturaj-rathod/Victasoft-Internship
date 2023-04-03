import { client, users } from "../index.js";

//Inserting one user at a time
const insertUser = async () => {
    try {
        const query = { 
            name: 'Fake user 1',
            email: 'fake_user_1@fakegmail.com',
            password:'$dfferiuy37653298734jhrfkudshsdf'
          }

        const user = await users.insertOne(query);

        console.log(user);
    } finally {
        client.close();
    }
}

// insertUser().catch((err) => console.log(err));


//insert many user at a time
const insertUsers = async () => {
    try {
        const query = [
            { name: 'John Deo 1', email: 'john_deo_1@fakegmail.com', password:'$dfferiuy37653298734jhrfkudshsdf'},
            { name: 'John Deo 2', email: 'john_deo_22@fakegmail.com', password:'$dfferiuy37653298734jhrfkudshsdf'},
            { name: 'John Deo 3', email: 'john_deo_3@fakegmail.com', password:'$dfferiuy37653298734jhrfkudshsdf'}
        ]

        const options = { ordered: true} //ordered simply continue insert document if one is fail to insert
        const user = await users.insertMany(query, options);

        console.log(user);
    } finally {
        client.close();
    }
}

insertUsers().catch((err) => console.log(err));