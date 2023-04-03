import { client, movies, users } from "../index.js";

//find many document from collection
const findMany = async () => {

    try {
        // const query = { runtime: { $lte: 15 } }; //movie which runtime is less than 15 min
        const query = { email: { $regex: new RegExp('john_deo_') } }; //movie which runtime is less than 15 min


        // const options = {
        //     sort: { title: 1 },
        //     projection: { _id: 0, title: 1, runtime: 1, imdb: 1 }
        // } // sort by title and select title and imdb field

        // const movie = await movies.find(query, options);

        const result = await users.find(query);

        await result.forEach(user => {
            console.log(user);
        })

        // await movie.forEach(element => {
        //     console.log(element);
        // });

    } finally {
        client.close();
    }
}

findMany().catch((err) => console.log(err));