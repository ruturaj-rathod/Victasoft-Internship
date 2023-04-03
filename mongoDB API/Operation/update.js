import { client, movies, users } from "../index.js";

const updateOne = async () => {
    try {
        // const query = { title: 'The Great Train Robbery' };
        const query = { email: 'fake_user_1@fakegmail.com' };
        const options = { upsert: true } //this will create new document if not document match with query
        // const updateDoc = {
        //     $set: {
        //         plot: 'This plot updated during updateOne method and also to see watch function'
        //     }
        // } 
        const updateDoc = {
            $set: {
                name: 'Fake User Update'
            }
        }

        // const doc = await movies.updateOne(query, updateDoc, options);
        const doc = await users.updateOne(query, updateDoc, options);

        console.log(doc);
    } finally {
        client.close();
    }
}
// updateOne().catch(err => console.log(err));

// update many document
const updateMany = async () => {
    try {
        // const filter = { rated: 'G' };
        const query = { email: { $regex: new RegExp('john_deo_') } };
        const updateDoc = {
            $set: {
                name: 'John_Deo_Update'
            }
        }

        // const doc = await movies.updateMany(filter, updateDoc);
        const doc = await users.updateMany(query, updateDoc);
        console.log(doc);

    } finally {
        client.close();
    }
}

updateMany().catch(err => console.log(err));

//find document and replace document
const replaceOne = async () => {
    try {
        const query = { title: { $regex: "Blacksmith Scene"}}
        const replaceDoc = {
            title: "This is repalce when running replaceOne method"
        }

        const doc = await movies.replaceOne(query, replaceDoc);
        console.log(doc);
    } finally {
        client.close();
    }
}
// replaceOne().catch(err => console.log(err));