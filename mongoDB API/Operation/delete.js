import { client, movies, users } from "../index.js";

const deleteOne = async () => {
    try {
        // const query = { title: "Annie Hall"};
        const query = { email: 'fake_user_1@fakegmail.com' };

        // const result = await movies.deleteOne(query);
        const result = await users.deleteOne(query);

        console.log(result);
    } finally {
        client.close();
    }
}
// deleteOne().catch(err => console.log(err));

//delete all document which match query
const deleteMany = async () => {
    try {
        // const query = { title: { $regex: "Santa"}}
        const query = { email: { $regex: new RegExp('john_deo_') } };

        // const result = await movies.deleteMany(query);
        const result = await users.deleteMany(query);

        console.log(result);
    } finally {
        client.close();
    }
}
deleteMany().catch(err => console.log(err));