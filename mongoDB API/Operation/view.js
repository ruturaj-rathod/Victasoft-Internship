import { client, sample_data } from "../index.js";

const shortMovie = async () => {
    try {
        const shortMovieCollection = sample_data.collection('shortMovie');
        const shortMovie = await shortMovieCollection.find({}, { _id: 0 });
        for await (const doc of shortMovie) {
            console.log(doc);
        }
    } finally {
        client.close();
    }
}

// shortMovie().catch(err => console.log(err));

const sample_orders = client.db('sample_orders');
const createCollectionForView = async () => {
    try {

        const inventory = sample_orders.collection('invetory');
        const orders = sample_orders.collection('orders');

        const invertoryInsert = (await inventory).insertMany([
            { prodId: 100, price: 20, quantity: 125 },
            { prodId: 101, price: 10, quantity: 234 },
            { prodId: 102, price: 15, quantity: 432 },
            { prodId: 103, price: 17, quantity: 320 }
        ]);

        const ordersInser = (await orders).insertMany([
            { orderId: 201, custid: 301, prodId: 100, numPurchased: 20 },
            { orderId: 202, custid: 302, prodId: 101, numPurchased: 10 },
            { orderId: 203, custid: 303, prodId: 102, numPurchased: 5 },
            { orderId: 204, custid: 303, prodId: 103, numPurchased: 15 },
            { orderId: 205, custid: 303, prodId: 103, numPurchased: 20 },
            { orderId: 206, custid: 302, prodId: 102, numPurchased: 1 },
            { orderId: 207, custid: 302, prodId: 101, numPurchased: 5 },
            { orderId: 208, custid: 301, prodId: 100, numPurchased: 10 },
            { orderId: 209, custid: 303, prodId: 103, numPurchased: 30 }
        ]);

        console.log('Insert Inventory \n' + invertoryInsert);
        console.log('Insert orders \n' + ordersInser);

        sample_orders.createCollection('sales', {
            "viewOn": "orders",
            "pipeline": [
                {
                    $lookup: {
                        from: "invetory",
                        localField: 'prodId',
                        foreignField: 'prodId',
                        as: 'inventoryDocs'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        prodId: 1,
                        orderId: 1,
                        numPurchased: 1,
                        price: "$inventoryDocs.price"
                    }
                },
                {
                    $unwind: "$price"
                }
            ]
        });

        console.log('Sales view created');
    } finally {
        client.close();
    }
}

// createCollectionForView().catch(err => console.log(err));

const filterView = async () => {
    try {
        const sales = sample_orders.collection('sales');

        const docs = await sales.aggregate([
            {
                $group: {
                    _id: "$prodId",
                    amountSold: { $sum: { $multiply: ["$price", "$numPurchased"]}}
                }
            }
        ]);

        for await(const doc of docs) {
            console.log(doc);
        }
    } finally {
        client.close();
        // process.exit();
    }
}

filterView().catch(err => console.log(err));