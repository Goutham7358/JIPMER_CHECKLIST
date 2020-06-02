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
//   if (req.body.BB) {
//     console.log("Checklist's BB output", req.body.BB);
//   } else {
//     console.log("Checklist's BB is not checked ");
//   }

  CheckList.find().then(result=>{
      const productNumbers = result.map(item=> item._id );
    
      for(let num of productNumbers){
        console.log(req.body.num ,req.body, num)
      }
      res.redirect('/');
  })
 
};
