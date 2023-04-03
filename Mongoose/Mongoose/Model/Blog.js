const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        alias: 'BlogTitle'
    },
    author: {
        first: String,
        last: String,
    },
    body: String,
    comments: [{
        body: String,
        date: Date
    }],
    tags: { type: [String], index: true }, //path level index
    date: {
        type: Date,
        default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favourite: Number
    }
});

//instance method
blogSchema.methods.sameAuthorBlog = function sameAuthorBlog() {
    return mongoose.model('Blog').find({ author: this.author });
}

//static method
blogSchema.statics.findByAuthor = function findByAuthor(name) {
    return this.find({ fullname: new RegExp(name, 'i') });
}

//Query method
blogSchema.query.byTitle = function byTitle(title) {
    return this.where({ title: new RegExp(title, 'i') });
}

//schema level index
blogSchema.index({ date: -1 });

//creating virtuals of fullname
blogSchema.virtual('fullname')
    .get(function () { //get full name
        return this.author.first + " " + this.author.last;
    })
    .set(function (fullname) { //setfullname
        this.author.first = fullname.substr(0, fullname.indexOf(' '));
        this.author.last = fullname.substr(fullname.indexOf(' ') + 1);
    });

//validation
blogSchema.path('body').validate(function (v) {
    if( v === '') {
        return false
    }
    return true
}, `Body sould not be empty`, 'Invalid Body');

//middleware
//syncronous hooks //currentlly 'init'
blogSchema.pre('init', pojo => {
    console.log(pojo);
});

//before save
blogSchema.pre('save', { document: true, query: false}, function () {
    console.log('Call before document save');
});

//after save
blogSchema.post('save', { document: true, query: false}, function () {
    console.log("Document is saved");
});

const Blog = mongoose.model('Blog', blogSchema);

const main = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test'); //connect to db
        const blog = new Blog({
            title: "How to learn JavaScript Effectivelly",
            fullname: "Ruturaj Rathod",
            body: "Here are some tips to learn JavaScript effectivelly .....",
            // body: "",
            comments: [
                {
                    body: "Very useful article",
                    date: Date.now()
                }
            ],
            hidden: false,
            tags: ['JavaScript', 'Tips'],
            meta: {
                votes: 4,
                favourite: 1
            }
        });
        
        await blog.save();
    } catch (error) {
        console.log(error);
    }

    process.exit();
}

main().catch(err => console.log(err));

Blog.watch().on('change', data => console.log(data));

const readDoc = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test'); //connect to db
        const blog = await Blog.find().byTitle('How to learn')
        // const blog = await Blog.findByAuthor('ruturaj').populate('author');
        console.log(blog);
        console.log(blog[0].fullname);
    } catch (error) {
        console.log(error);
    }
    process.exit();
}

// readDoc().catch(err => console.log(err));
module.exports = Blog;