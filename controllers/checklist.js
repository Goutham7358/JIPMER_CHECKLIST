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
//  let num ="BB";
//   if (req.body.num) {
//     console.log("Checklist's BB output", req.body.BB);
//   } else {
//     console.log("Checklist's BB is not checked ");
//   }
//   res.redirect('/');

const result = Object.keys(req.body).map((key)=>{
  return key;
})
let productsId=[];
let products = [];

Promise.resolve(result.forEach((item)=>{
  CheckList.findOne({_id: item}).then(prod=>products.push(prod))
})).then(result=>{
  console.log("The products is :",products)
})

// CheckList.find().then(items=>{
//   items.forEach((item)=>{
//    let checkedProductId = result.find((i)=> i == item._id);
//    console.log(checkedProductId)
//    if(checkedProductId){
//     productsId.push(checkedProductId);
//    }
//   })
// }).then(result=>{
//   productsId.forEach((id)=>{
//     CheckList.findOne({_id: id}).then(prod=>console.log(prod))
//   })
// })

// result.forEach((id)=>{
//     return CheckList.find({_id: id}).then(result=>{
//        console.log(result[0])
//        products.push(result[0]);
//        console.log(products)
//      })
//    })


res.redirect('/');

  // CheckList.find().then(result=>{
  //     const productNumbers = result.map(item=> item._id );
    
  //     for(let num of productNumbers){
  //       result.find(()=>)
  //     }
  //     res.redirect('/');
  // })

};
