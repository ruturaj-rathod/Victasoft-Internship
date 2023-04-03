import { client, movies } from "../index.js";

const distinct = async () => {
    try {
        const query = { directors: "Barbra Streisand"} //It gives all document in which directors is Barbra Streisand
        const filed_name = "year"; //this will distinct field in document so it not contian duplicate year

        const doc = await movies.distinct(filed_name, query);
        console.log(doc);
    } finally {
        client.close();
    }
}
distinct().catch(err => console.log(err));