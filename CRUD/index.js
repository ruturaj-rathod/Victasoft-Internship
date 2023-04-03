const { MongoClient } = require('mongodb');

const main = async () => {
    const uri = "mongodb+srv://rutubha:rutubha@cluster0.c9davph.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect(); //connnect to mongodb


        //create on listing
        
        await createListing(
            client,
            {
                name: "jonh deo",
                summary: "A charming deo in Paris",
                badrooms: 1,
                bathrooms: 1
            }
        )
        

        /*
        await createMultipleListings(
            client, [
                {
                    name: "Mark allen",
                    summary: "A Mark is in Paris",
                    badrooms: 4,
                    bathrooms: 3,
                    beds: 5
                },
                {
                    name: "Moris stark",
                    summary: "A stark roar in UK",
                    badrooms: 1,
                    bathrooms: 1
                },
                {
                    name: "Human being",
                    summary: "A Human serve in earth",
                    badrooms: 100,
                    bathrooms: 132,
                    last_review: new Date() 
                }
            ]
        ) */

        // Reading on Listing
        await findOneListingByName(client, "jonh deo");

        /*await findListingWithMinimumBedrooms(client, {
            minimumNumberOfBedrooms: 1,
            minimumNumberOfBathrooms: 1
        })*/


        //Update on Listing
        /*await updateListingByName(client, "jonh deo", {
            badrooms: 6,
            bathrooms: 8
        })*/

        // upsert
        /*await upsertListingByName(client, "Lazzy Cottage", {
            name: "Lazy Cottage",
            bathrooms: 2,
            badrooms: 4
        })*/

        // await updateAllListingToHaveProperty(client);

        //Deleting Listing
        // await deleteListingByName(client, "Lazy Cottage");

        // await deleteListingScrappedBeforeDate(client, new Date());

        // await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close(); //close connection
    }
}

main().catch(console.err);


//Create Listing
const createListing = async (client, newListing) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

const createMultipleListings = async (client, newListings) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

//Reading Listing
const findOneListingByName = async (client, nameOfListing) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").findOne({ name: nameOfListing });
    if (result) {
        console.log(`Found a listing in the collection with the name ${nameOfListing}: `);
        console.log(result);
    } else {
        console.log((`No listing found with the name ${nameOfListing}`));
    }
}

const findListingWithMinimumBedrooms = async (client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) => {
    const cursor = await client.db("sample_airbnb").collection("listingAndReview").find({
        badrooms: { $gte: minimumNumberOfBedrooms},
        bathrooms: { $gte: minimumNumberOfBathrooms }
    })
    .sort( { last_review: -1})
    .limit(maximumNumberOfResults);

    const results = await cursor.toArray();

    if(results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms : `);
        results.map((result, i) => {
            date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`    _id: ${result._id}`);
        })
    } else {
        console.log("Not Found");
    }
}


//Update Document
const updateListingByName = async (client, nameOfListing, updateListing) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").updateOne(
        { name: nameOfListing},
        { $set: updateListing}
    ); 

    console.log(`${result.matchedCount} documents(s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents(s) was/were updated`);
}

const updateAllListingToHaveProperty = async (client) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").updateMany({
        date: {$exists: false}
    },
    { $set: {date: new Date()}});

    console.log(`${result.matchedCount} document(s) mathed the query criteria`);
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

const upsertListingByName = async (client, nameOfListing, updateListing) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").updateOne(
        { name: nameOfListing},
        { $set: updateListing},
        { upsert: true}
    );

    console.log(`${result.matchedCount} doucments mathed the query criteria`);
    if(result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }
}

//Delete Document
const deleteListingByName = async (client, nameOfListing) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").deleteOne({
        name: nameOfListing
    });

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}

const deleteListingScrappedBeforeDate = async (client, date) => {
    const result = await client.db("sample_airbnb").collection("listingAndReview").deleteMany({
        "date": {$lt: date}
    });

    console.log(`${result.deletedCount} document(s) was/were deleted`);
}


const listDatabases = async (client) => {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList?.databases.foreach(db => console.log(` - ${db.name}`));
}