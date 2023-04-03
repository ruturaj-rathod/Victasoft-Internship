const mongoose = require('mongoose');

const main = async () => {
    await mongoose.connect('mongodb://localhost:27017/test');

    const kittenSchema = mongoose.Schema({
        name: {
            type: String,
            require: [true, 'Name is require']
        }
    });

    //Method
    kittenSchema.methods.speak = function speak() {
        const greeting = this.name ? `My name is ${this.name}` : `I don't have name`;
        console.log(greeting);
    }

    const Kitten = mongoose.model('Kitten', kittenSchema);

    const silent = new Kitten({name: 'silent'});
    await silent.save();

    
    // console.log(silent.name);
    // silent.speak();
    
    const kittens = await Kitten.find({});
    console.log(kittens);

    console.log(kittens[0].id);

    process.exit();
}

main().catch(err => console.log(err));