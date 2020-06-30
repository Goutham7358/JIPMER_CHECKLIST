const CheckList = require('../models/checklist');

exports.getChecklist = async (req, res, next) => {
    let errorMessage = req.flash('error');
  console.log(errorMessage);
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
    console.log(req.session);
  const items = await CheckList.getSortedItems().catch(err=>{
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
   
    if(items.length > 0){ 
        res.render('checklist', {
            items: items,
            path: '/',
            isLoggedIn: req.session.isLoggedIn,
            errorMessage
        }); 
       }

};

exports.postChecklist = (req, res, next) => {
    const body = req.body;
    delete body._csrf
    const result = Object.keys(body).map((key) => {
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
            }).catch(err => {
                console.log(err);
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
        });
    };
    start().then(() => {
        console.log(products);
        if(products.length == 0)
        {
            req.flash('error', 'None selected');
            res.redirect('/')
        }
        else{
            res.render('downloadDoc',{
                products: products,
                path: '/download',
            isLoggedIn: req.session.isLoggedIn,
              })
        }
       
    }).catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
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

    const items = await CheckList.getSortedItems()
    .catch(err=>{
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
    if (/\S/.test(req.body.description))
    {
        try{
            await CheckList.addItemInOrder(items,req.body.number,req.body.description)
            .catch(err=>{
                console.log(err);
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
        } catch(err) {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        }
        res.redirect('/');
    }
    res.redirect('/add-point');
   
};