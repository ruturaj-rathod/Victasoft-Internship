const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
    name: String,
    age: Number,
    stories: [{ type: mongoose.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'Person' },
    title: String,
    fans: [{ type: mongoose.Types.ObjectId, ref: 'Person' }]
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

(async () => {
    const connection = await mongoose.connect('mongodb://localhost:27017/test');
    // console.log(connection.get('runValidators'));
    //     // console.log(mongoose.mquery);
    //     console.log(mongoose.mongo);
})(); //connect mongodb

const savingRef = async () => {
    const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Iron Man',
        age: 40
    });

    author.save()
        .then(() => {
            console.log('Saving Author');

            const stroy1 = new Story({
                // title: 'Royal Battle',
                title: 'Royal Battle 2',
                author: author._id
            });

            stroy1.save()
                .then(() => {
                    console.log('Saving Stroy');
                    author.stories.push(stroy1._id);
                    author.save();
                })
                .catch(err => {
                    console.log('Error in story ' + err);
                });
        })
        .catch(err => {
            console.log('Error in author ' + err);
        });
}

// savingRef();

const populating = async () => {
    // let copy;
    // Story.findOne({ title: 'Royal Battle' })
    //     .then((story) => {
    //         console.log('Instance of objectId ' + story.author instanceof mongoose.Types.ObjectId);
    //         console.log(`Is author populate ${story.populated('author')}`);
    //         console.log('Story is \n ' + story);
    //         copy = story.$clone();
    //         console.log('Copy is  \n '+ copy)
    //     })
    // Story.findOne({ title: 'Royal Battle' }).populate('author')
    //     .then((story) => {
    //         console.log('populated doc  \n ' + story.$getAllSubdocs())
    //         console.log(`Is author populate ${story.populated('author')}`);
    //         console.log('Story is \n ' + story);
    //     })

    Story.countDocuments().then((result) => {
        console.log(`Count is ${result}`);
    });
     Story.estimatedDocumentCount().then((result) => {
        console.log(`Count is ${result}`);
    });
}

populating();

const noDocumentMatch = async () => {
    await Person.deleteMany({ name: 'Iron Man' });

    const story = await Story.findOne({ title: 'Royal Battle' }).populate('author').populate('fans'); //multiple populate

    console.log(story.author); //it will be null if no document
    console.log(story.fans); //it will be [] if no document
}

// noDocumentMatch();

const fieldSelection = async () => {
    const story = await Story.findOne({ title: 'Royal Battle 2' }).populate('author', 'name');
    console.log(`Author name ${story.author.name}`);
    console.log(`Author age ${story.author.age}`); //this give undefined because we only selecte name as field
}

// fieldSelection();

const filterInPopulate = async () => {
    const story = await Story.findOne({ title: 'Royal Battle' })
        .populate({ path: 'author', match: { age: { $gte: 41 } } });
    console.log('Author if age is gte 41 ' + story.author);
    //It render stroy document first and then check condition to populate author document
}

// filterInPopulate();

const limitNoOfDocPopulate = async () => {
    // await Story.create([
    //     { title: 'Casino Royal', fans: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] },
    //     { title: 'Do or Die', fans: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] }
    // ]);

    //here all give length 0 
    //because not found document
    //Include on one story id with real person id so it give the length 1
    const stories = await Story.find().populate({
        path: 'fans',
        options: { limit: 2 }
    });

    stories.map((story, index) => {
        console.log(`Story ${index + 1} length is ${story.fans.length}`);
    })
}

// limitNoOfDocPopulate();

const multiLevelPopulate = async () => {
    const story = await Story.findOne({ title: 'Royal Battle 2' })
        .populate({
            path: 'author',
            populate: { path: 'stories' }
        });

    console.log(story.author.stories[0]); //story author write all stories -- first one
}

// multiLevelPopulate();

const crossDatabasePopulate = async () => {
    await mongoose.connect('mongodb://localhost:27017/');
    // const db2 = await mongoose.connect('mongodb://localhost:27017/');

    //DB1 schema
    const convertionSchema = mongoose.Schema({
        numMessage: Number
    });
    const Convertion = mongoose.model('Convertion', convertionSchema, 'db1');

    //DB2 schema
    const eventSchema = mongoose.Schema({
        name: String,
        convertion: {
            type: mongoose.Types.ObjectId,
            ref: Convertion
        }
    });
    const Event = mongoose.model('Event', eventSchema, 'db2');

    const convertion = new Convertion({ numMessage: 5 });
    convertion.save().then(() => {
        const event = new Event({
            name: 'Github Talk',
            convertion: convertion._id
        });

        event.save().then(() => {
            console.log('Data created');
        })
    });

    const events = await Event.
        find().
        // The `model` option specifies the model to use for populating.
        populate({ path: 'conversation', model: Convertion });
}
// crossDatabasePopulate();

const dynamicRef = async () => {
    const commentSchema = new Schema({
        body: { type: String, required: true },
        doc: {
            type: Schema.Types.ObjectId,
            required: true,
            // will look at the `docModel` property to find the right model.
            refPath: 'docModel'
        },
        docModel: {
            type: String,
            required: true,
            enum: ['BlogPost', 'Product']
        }
    });

    const Product = mongoose.model('Product', new Schema({ name: String }));
    const BlogPost = mongoose.model('BlogPost', new Schema({ title: String }));
    const Comment = mongoose.model('Comment', commentSchema);

    const blog = await BlogPost.create({ title: 'How to match Ref model' });
    const book = await Product.create({ name: 'Y dienal liang JAVA' });

    const commentOnPost = await Comment.create({
        body: 'Nice explianation',
        doc: blog._id,
        docModel: 'BlogPost'
    });

    const commentOnBook = await Comment.create({
        body: 'Very Good Book',
        doc: book._id,
        docModel: 'Product'
    });

    const comments = await Comment.find().populate('doc').sort({ body: 1 });

    console.log(`Comment on ${comments[1].doc.name}`);
    console.log(`Comment on ${comments[0].doc.title}`);
}

// dynamicRef();