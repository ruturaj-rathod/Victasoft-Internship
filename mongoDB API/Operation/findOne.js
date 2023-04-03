import { client, movies, users } from "../index.js";

// findOne to find document
const findByTitle = async () => {

    try {

        //find by movie title
        // const query = { title: 'The Room'};
        const query = { email: 'fake_user_1@fakegmail.com'};
        
        //sort by imbd ratings and select field title and imbd and exclude _id
        // const options = {
            //     sort: { "imdb.rating": 1},
            //     projection: { _id: 0, title: 1, imdb: 1}
            // }
            
            const user = await users.findOne(query);
            console.log(user);
        } catch (error) {
            console.log(error);
        }

    // movies.findOne(query, options).then((movie) => {
    //     console.log(movie);
    // }).catch((error) => {
    //     console.log(error);
    // }).finally(() => {
    //     client.close();
    // });
}

findByTitle();