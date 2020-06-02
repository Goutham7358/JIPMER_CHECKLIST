const CheckList = require('../models/checklist');

exports.getChecklist = (req, res, next) => {
    CheckList.find()
        .then((items) => {
            res.render('checklist', {
                items: items,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postChecklist = (req, res, next) => {
    const result = Object.keys(req.body).map((key) => {
        return key;
    })
    let products = [];

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index]);
        }
    }

    const start = async() => {
        await asyncForEach(result, async(id) => {
            await CheckList.findOne({ _id: id })
                .then((product) => {
                    if (product)
                        products.push(product);
                })
        });

    }
    start()
        .then(() => {
            console.log(products);
            res.redirect('/');
        });

};

exports.getAddPoint = (req,res,next)=>{
  res.render('addpoint');
}

exports.postAddPoint = (req,res,next)=>{
  const checklist = new CheckList({
    number: req.body.number,
    description: req.body.description
  })
  
  checklist.save().then(result=>{
    res.redirect('/')
  })
}

