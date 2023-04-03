//Alarm promise API

//set alarm function
/*
const setAlarm = () => {
    setTimeout(() => {
        console.log('Wake up');
    }, 1000);
}

setAlarm();
*/

const alarm = (person, delay) => {
    return new Promise((resolve, reject) => {
        if(delay < 0) {
            throw new Error('Alarm delay must not be negative');
        };

        setTimeout(() => {
            resolve(`Wake up ${person}`);
        }, delay)
    })
};

alarm('Ruturaj', 2000)
    .then( message => {
        console.log(message);
    })
    .catch( error => {
        console.log(`coudn't set alarm: ${error}`);
    });

alarm('Ruturaj', -100)
    .then( message => {
        console.log(message);
    })
    .catch( error => {
        console.log(`coudn't set alarm: ${error}`);
    });

const setAlarm = async () => {

    try {
        const message = await alarm('Sunrise', 4000);
        console.log(message);
    } catch (error) {
        console.log(`Alarm coudn't set: ${error}`);       
    }
};

setAlarm();