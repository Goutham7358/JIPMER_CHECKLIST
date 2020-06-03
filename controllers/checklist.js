const CheckList = require('../models/checklist');

exports.getChecklist = (req, res, next) => {
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

            res.render('checklist', {
                items: items,
                path: '/'
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postChecklist = (req, res, next) => {
    const result = Object.keys(req.body).map((key) => {
        return key;
    });
    let products = [];

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index]);
        }
    }

    const start = async() => {
        await asyncForEach(result, async(id) => {
            await CheckList.findOne({ _id: id }).then((product) => {
                if (product) products.push(product);
            });
        });
    };
    start().then(() => {
        console.log(products);

        res.render('downloadDoc',{
          products: products,
          path: '/download'
        })
    });
};

exports.getAddPoint = (req, res, next) => {
    res.render('addpoint', {
        editing: false,
        path: '/add-point'
    });
}

exports.postAddPoint = (req, res, next) => {
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

            async function asyncForEach(array, callback) {
                for (let index = req.body.number - 1; index < array.length; index++) {
                    await callback(array[index], index, array);
                }
            }

            const itemUpdate = (item, index, items) => {
                item.number = index + 2;
                item.save();
            };

            const start = async() => {
                await asyncForEach(items, itemUpdate);
            };

            if (req.body.number > items.length + 1) {
                req.body.number = items.length + 1;
                console.log("This can't be done?", req.body.number)
                const checklist = new CheckList({
                    number: req.body.number,
                    description: req.body.description,
                });

                checklist.save().then((result) => {
                    res.redirect('/');
                });
            } else if (req.body.number >= 0) {
                start().then((result) => {
                    const checklist = new CheckList({
                        number: req.body.number,
                        description: req.body.description,
                    });

                    checklist.save().then((result) => {
                        res.redirect('/');
                    });
                });
            } else {
                res.redirect('/')
            }
        })
        .catch((err) => {
            console.log(err);
        });
};