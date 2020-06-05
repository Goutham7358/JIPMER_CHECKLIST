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
                path: '/settings',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.deleteItem = async (req, res, next) => {
    id = req.body.itemToDelete;
    number = req.body.itemNumber;

    await CheckList.deleteItemInOrder(req.body.itemToDelete, req.body.itemNumber).catch(err=>console.log(err));
    res.redirect('/settings')
};

async function moveFunc(action, itemIndex, items) {
    if (action === 'up') {
        if (itemIndex - 1 >= 0) {
            let tempNum;
            tempNum = items[itemIndex].number;
            items[itemIndex].number = items[itemIndex - 1].number;
            items[itemIndex - 1].number = tempNum;
            await items[itemIndex].save();
            await items[itemIndex - 1].save();
        }
    }
    if (action === 'down') {
        if (itemIndex + 1 < items.length) {
            let tempNum;
            tempNum = items[itemIndex].number;
            items[itemIndex].number = items[itemIndex + 1].number;
            items[itemIndex + 1].number = tempNum;
            await items[itemIndex].save();
            await items[itemIndex + 1].save();
        }
    }
}

exports.moveHandler = (req, res, next) => {

    selectedItem = req.body.itemToMove;
    action = req.body.action;

    CheckList.find()
        .then( async (items) => {

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

            await moveFunc(action, itemIndex, items);
            
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
            path: '/settings'
        })
    })
}

exports.postEditPoint = async (req, res, next) => {
    const new_number = req.body.number;
    const new_description = req.body.description;

  const editedItem =   await CheckList.findById(req.body.id);

  if(editedItem.number == new_number){
      editedItem.description = new_description;
     await editedItem.save();
  }else{
    await CheckList.deleteItemInOrder(editedItem._id, editedItem.number).catch(err=>console.log(err));
    const items = await CheckList.getSortedItems().catch(err=>console.log(err));
    await CheckList.addItemInOrder(items,new_number,new_description).catch(err=>console.log(err));
  }

    
    res.redirect('/settings')

}