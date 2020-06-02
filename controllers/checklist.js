const CheckList = require('../models/checklist');

exports.getChecklist = (req, res, next) => {
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
  res.render('addpoint',{
    editing: false
  });
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
exports.getEditPoint = (req,res,next)=>{
  const itemId = req.params.editItem;
  CheckList.findById(itemId).then((item)=>{
    if(!item){
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

