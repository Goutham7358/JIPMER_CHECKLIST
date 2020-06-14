const CheckList = require('../models/checklist');

exports.getChecklist = async (req, res, next) => {
    console.log(req.session);
  const items = await CheckList.getSortedItems().catch(err=>console.log(err));
   
    if(items.length > 0){ 
        res.render('checklist', {
            items: items,
            path: '/',
            isLoggedIn: req.session.isLoggedIn,
        }); 
       }

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
        if(products.length == 0)
        {
            res.redirect('/')
        }
        else{
            res.render('downloadDoc',{
                products: products,
                path: '/download',
            isLoggedIn: req.session.isLoggedIn,
              })
        }
       
    });
};

exports.getAddPoint = (req, res, next) => {
    res.render('addpoint', {
        editing: false,
        path: '/add-point',
        isLoggedIn: req.session.isLoggedIn,
    });
}

exports.postAddPoint = async (req, res, next) => {

    const items = await CheckList.getSortedItems().catch(err=>console.log(err));
    if (/\S/.test(req.body.description))
    {
        await CheckList.addItemInOrder(items,req.body.number,req.body.description).catch(err=>console.log(err));
        res.redirect('/');
    }
    res.redirect('/add-point');
   
};