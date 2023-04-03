const mongoose = require('mongoose');
const assert = require('assert');

(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
})();

const discrimantor = async () => {
    const options = { discrimantorKey: 'kind' }

    const eventSchema = mongoose.Schema({
        time: Date
    }, options);
    const Event = mongoose.model('Event', eventSchema);

    const ClickedLinkEvent = Event.discriminator('ClickedLink',
        new mongoose.Schema({ url: String }, options)
    )

    const event1 = new Event({ time: Date.now(), url: 'google.com' });
    assert.ok(!event1.url);

    const event2 = new ClickedLinkEvent({ time: Date.now(), url: 'google.com' });
    assert.ok(event2.url);

    await Promise.all([event1.save(), event2.save()]);
    const count = await Event.countDocuments();
    // assert.equal(count, 2);
}

discrimantor();