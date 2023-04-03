import { client, movies } from "../index.js";

const count = async () => {
    try {
        const estimeCount = await movies.estimatedDocumentCount(); 
        //this method use collection metadata to count so it's not accurate but fast method
        console.log(`Estimate Count is ${estimeCount.toString()}`);

        const query = { countries: "Canada"}
        const docCount = await movies.countDocuments(query);

        console.log(`Document count of canada country ${docCount.toString()}`)
    } finally {
        client.close();
    }
}
count().catch(err => console.log(err));