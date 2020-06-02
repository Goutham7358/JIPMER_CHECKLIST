const CheckList = require("../models/checklist");

exports.getSettings = (req, res, next) => {
    CheckList.find()
        .then((items) => {
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
    item = req.body.itemToMove;
    action = req.body.action;
    console.log("Do", action, "on item:", item);
    res.redirect('/settings');
}