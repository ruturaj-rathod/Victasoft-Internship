import { MongoClient } from "mongodb";

const uri = "mongodb+srv://rutubha:rutubha@cluster0.c9davph.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);
const sample_data = client.db('sample_mflix'); // sample_data database
const comments = sample_data.collection('comments'); //comments collection in sample_data database
const movies = sample_data.collection('movies'); //Movie collection in sample_data database
const users = sample_data.collection('users');

export { client, sample_data, comments, movies, users };


//Sample example
const run = async () => {
    try {
        //     const query = { name: "John Bishop" };
        //     const comment = await comments.updateOne(query, { $set: { 'email': 'john-bishop@dummygmail.com' } });
        //     console.log(comment);

        //create View 
        sample_data.createCollection(
            "shortMovie",
            {
                "viewOn": "movies",
                "pipeline": [{ $match: { runtime: { $lte: 15 } } }],
            }
        )

        console.log('Create view');
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
// run().catch(err => console.log(err));
