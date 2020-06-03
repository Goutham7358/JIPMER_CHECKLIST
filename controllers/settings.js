const CheckList = require("../models/checklist");

exports.getSettings = (req, res, next) => {
    CheckList.find()
        .then((items) => {

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

            res.render("settings", {
                items: items,
                path: '/settings'
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.deleteItem = (req, res, next) => {
    id = req.body.itemToDelete;
    number = req.body.itemNumber;
    CheckList.findByIdAndRemove(id)
        .then(() => {
            console.log("Deleted");
            console.log(id, number);
            //res.redirect("/settings");
            CheckList.find()
                .then((items) => {
                    async function asyncForEach(array, callback) {
                        for (let index = 0; index < array.length; index++) {
                            await callback(array[index]);
                        }
                    }

                    const start = async() => {
                        await asyncForEach(items, async(item) => {
                            if (item.number > number) {
                                item.number--;
                                await item.save();
                            }
                        });

                    }
                    start()
                        .then(() => {
                            console.log(items);
                            res.redirect('/settings');
                        });
                })
        })
        .catch(err => {
            console.log(err);
        });

};

exports.moveHandler = (req, res, next) => {

    selectedItem = req.body.itemToMove;
    action = req.body.action;

    CheckList.find()
        .then((items) => {

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
            console.log("Selected item index is:", selectedItem)
            const itemIndex = items.findIndex(item => item._id.toString() === selectedItem.toString());
            console.log("The index of the item is:", itemIndex);

            if (action === 'up') {
                if (itemIndex - 1 >= 0) {
                    let tempNum;
                    tempNum = items[itemIndex].number;
                    items[itemIndex].number = items[itemIndex - 1].number;
                    items[itemIndex - 1].number = tempNum;
                    items[itemIndex].save();
                    items[itemIndex - 1].save();
                }

            }

            if (action === 'down') {
                if (itemIndex + 1 < items.length) {
                    let tempNum;
                    tempNum = items[itemIndex].number;
                    items[itemIndex].number = items[itemIndex + 1].number;
                    items[itemIndex + 1].number = tempNum;
                    items[itemIndex].save();
                    items[itemIndex + 1].save();
                }

            }

            console.log("The item before the selected item is :", items[itemIndex - 1]);
            console.log("The item after the selected item is:", items[itemIndex + 1]);
            res.redirect('/settings');

        })
        .catch((err) => {
            console.log(err);
        });


}

exports.getEditPoint = (req, res, next) => {
    const itemId = req.params.editItem;
    CheckList.findById(itemId).then((item) => {
        if (!item) {
            res.redirect('/settings');
        }
        console.log(item);
        res.render('addpoint', {
            editing: true,
            itemId: item._id,
            itemNumber: item.number,
            itemDesc: item.description,
        })
    })
}

exports.postEditPoint = (req, res, next) => {
    CheckList.findById(req.body.id).then((item) => {
        item.number = req.body.number;
        item.description = req.body.description;
        return item.save()
    }).then(() => {
        console.log('modified');
        res.redirect('/settings');
    })
}