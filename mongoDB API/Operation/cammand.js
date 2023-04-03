import { client, sample_data } from "../index.js";

//cammnd method on database instance to diagonst and addministrative task
const dbInfo = async () => {
    try {
        const dbInfo = await sample_data.command({
            dbStats: 1,
        });
        console.log(dbInfo);
    } finally {
        client.close();
    }
}
dbInfo().catch(err => console.log(err));