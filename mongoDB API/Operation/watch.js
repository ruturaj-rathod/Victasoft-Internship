import { client, sample_data } from "../index.js";

//watch the change into mongoClient or database or collection
let changeStream
const watchUpdate = async () => {
    try {
        changeStream = sample_data.watch();

        for await(const change of changeStream) {
            console.log(`Recieved change:\n`, change);
        }

        await changeStream.close();
    } finally {
        await client.close();
    }
}

watchUpdate().catch(console.dir);