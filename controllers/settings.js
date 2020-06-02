const CheckList = require("../models/checklist");

exports.getSettings = (req, res, next) => {
    CheckList.find()
    .then((items) => {

      function compare(a, b){
        if(a.number < b.number){
          return -1;
        }else if(a.number > b.number){
          return 1;
        }else{
          return 0;
        }
      }

     items.sort(compare);

     res.render("settings", {
        items: items,
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
        res.redirect("/settings");
    }).catch( err=> {
        console.log(err);
    });
};

exports.moveHandler = (req, res, next) => {

    selectedItem = req.body.itemToMove;
    action = req.body.action;

    CheckList.find()
    .then((items) => {

      function compare(a, b){
        if(a.number < b.number){
          return -1;
        }else if(a.number > b.number){
          return 1;
        }else{
          return 0;
        }
      }

     items.sort(compare);
      console.log("Selected item index is:",selectedItem)
     const itemIndex = items.findIndex(item=>item._id.toString() === selectedItem.toString());
     console.log("The index of the item is:",itemIndex);

     if(action === 'up'){
         if(itemIndex - 1 >= 0){
            let tempNum;
            tempNum = items[itemIndex].number;
            items[itemIndex].number = items[itemIndex-1].number;
            items[itemIndex-1].number = tempNum;
            items[itemIndex].save();
            items[itemIndex-1].save();
         }
        
     }

     if(action === 'down'){
        if(itemIndex + 1 < items.length){
           let tempNum;
           tempNum = items[itemIndex].number;
           items[itemIndex].number = items[itemIndex+1].number;
           items[itemIndex+1].number = tempNum;
           items[itemIndex].save();
           items[itemIndex+1].save();
        }
       
    }

     console.log("The item before the selected item is :", items[itemIndex-1]);
      console.log("The item after the selected item is:",items[itemIndex+1]);
      res.redirect('/settings');
   
    })
    .catch((err) => {
        console.log(err);
    });
  
    
}