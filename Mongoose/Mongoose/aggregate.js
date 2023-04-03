const mongoose = require('mongoose');
const Count = require('./Model/Count');

(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
})();

const createDoc = async () => {
    const doc = await Count.create({
        name: 'xyz',
        balance: 400
    });
    console.log('Doc created', doc);
}

// createDoc();

//Max Balance
const maxBalance = async () => {
    const res = await Count.aggregate([
        {$group: {_id: null, maxBalance: { $max: '$balance'}}}
    ]);

    console.log(res);
}

// maxBalance();

//Balance greater than 300
const gteBalance = async (balance, lt) => {
    const res = await Count.aggregate([
        {$match: { balance: { $gte: balance}}}
    ]).addFields({ balance_k: {$divide: ['$balance', 1000]}}) //add new field to existing document
    .append({$match: { balance: { $lte: lt}}}) //append the aggregate
    .collation({locale: 'en_US', strength: 1})
    // .count('balance'); //this will count the number of occurence in field

    // asyncIterator call by javascript runtime
    for await (const doc of res) {
        console.log(doc);
    }
}
// gteBalance(200, 400);

const setCursor = async () => {
    const cursor = await Count.aggregate([
        {$match: { balance: { $gte: 100}}}
    ]).cursor({ batchSize: 1}); //batch file specify the number of document retrun in each batch

    cursor.eachAsync(function(doc, i) {
        console.log(`Iteration ${i} \n`);
        console.log(doc);
    })
}

// setCursor();

//densify the doucment
/* Densify create new doc if not present in doucment in range*/
const getDensify = async () => {
    const densify = await Count.aggregate([
        {$match: { balance: { $gte: 100}}}
    ]).densify({
        field: 'balance',
        range: {
            step: 10,
            // unit: 'hour',
            bounds: [100, 500]
        }
    });

    for await(const doc of densify) {
        console.log(doc);
    }
}

// getDensify();

const explain = async () => {
    Count.aggregate([
        {$match: { balance: { $gte: 100}}}
    ]).explain();
    // console.log(explain);
}

// explain();

const facet = async () => {
    const res = Count.aggregate().facet({
        balance: [{ balance: 200}]
    });
    console.log(res);
}

// facet();

const fill = async () => {
    const fill = await Count.aggregate().fill({
        output: {
            balance: { value: 0}
        }
    }); //Populates null and missing field values within documents.
    //like here if balance field value is null or missing it add balance as 0 to document
    console.log(fill);
}

// fill();

const groupByName = async () => {
    const group = await Count.aggregate().group({ _id: '$name'}) //group the with same name field
    .hint({_id: 1})
    .limit(1); //this will retriwe only number of document specify in limit 
    console.log(group);
}

// groupByName();

const lookUp = async () => {
    const lookUp = await Count.aggregate().lookup({ from: 'counts', localField: 'name', foreignField: 'name', as: 'matchName'});
    for await(const doc of lookUp) {
        console.log(doc);
    }
}

// lookUp();

// const near = async () => {
//     const near = await  Count.aggregate().near({
//         near: { value: 200},
//         distanceField: 'balance',
//         maxDistance: 300,
//         query: { type: 'public'},
//         includeLocs: 'balance', 
//     });
//     console.log(near);
// }

// near();

const sample = async () => {
    const reduct = await Count.aggregate()
    .sample(3); //selection random sample with specified size
    // .redact({
    // $eq: ['balance', 200]
    // }, '$$PRUNE', '$$DESCEND');

    console.log(reduct);
}

// sample();

const search = async () => {
    const search = await Count.aggregate()
    .search({ text: {
        query: 'y',
        path: 'name'
    }});

    console.log(search);
}

search();