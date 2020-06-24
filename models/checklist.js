const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkListSchema  = new Schema({
    number:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});



checkListSchema.statics.getSortedItems = async function (){

    const items = await this.find();
    function compare(a, b) {
        if (a.number < b.number) {
            return -1;
        } else if (a.number > b.number) {
            return 1;
        } else {
            return 0;
        }
    }

    items.sort(compare);

    return items;
   
}

checkListSchema.statics.addItemInOrder = async function(items, itemNumber, itemDescription){
    async function asyncForEach(array, callback) {
        for (let index = itemNumber - 1; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const itemUpdate = async (item, index, items) => {
        item.number = index + 2;
       await item.save();
    };

    const start = async() => {
        await asyncForEach(items, itemUpdate);
    };

    if (itemNumber > items.length + 1) {
        itemNumber = items.length + 1;
        console.log("This can't be done?", itemNumber)
        const checklist = new this({
            number: itemNumber,
            description: itemDescription,
        });
        (async()=>{
            await  checklist.save()
        })();
     
    } else if (itemNumber >= 0) {
            await start()
            const checklist = new this({
                number: itemNumber,
                description: itemDescription,
            });

            (async()=>{
                await  checklist.save()
            })();
    
    }
}

checkListSchema.statics.deleteItemInOrder = async function(deleteId,deleteNumber){

    let items;

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index]);
        }
    }

    const start = async() => {
        await asyncForEach(items, async(item) => {
            if (item.number > deleteNumber) {
                item.number--;
                await item.save();
            }
        });

    }

    await this.findByIdAndRemove(deleteId)
     items =  await this.find()
    await start()
}

module.exports = mongoose.model('Checklist',checkListSchema);