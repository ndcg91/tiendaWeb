/*=============================================>>>>>
= CRUD CREATION =
shop example

get all--- list all shops
/api/shop

get a shop
/api/shop/id

create a shop
form with all db fields filled
return type json with shop item with id
/api/shop


===============================================>>>>>*/






module.exports = function(router){
  var module = {};
  console.log("crud initialization");
  module.createCrud = function(db,dbName,dbFields,all,get,create,update,remove){
    var endpointString = '/' + dbName
    global.globalDB = db;
    //get all
    router.get(endpointString,function(req,res){
      console.log("GET",endpointString,'\n')
      console.log("get ALL",dbName,'\n');
      db.find({},function(err,items){
        if (err) { res.send(err); return }
        res.send(items);
      });
    })


    //get one
    router.get(endpointString + '/:id',getDbItemByID,function(req,res){
        console.log("GET",endpointString,'/:id \n');
        console.log("get item",dbName,req.params.id, '\n');
        res.send(req.item);
    });

    //create one
    router.post(endpointString,function(req,res){
      console.log("POST",endpointString,'\n');
      console.log("create item", dbName,dbFields);
      var newObject = new db();
      dbFields.forEach(elem => {
        newObject[elem] = req.body[elem];
      });
      newObject.save(function(err,obj){
        if (err) {res.send(err);return}
        res.send(obj);
      })
    })

    //update one
    router.put(endpointString+ '/:id',getDbItemByID,function(req,res){
      console.log("PUT",endpointString,'/:id \n');
      console.log("update item",dbName,req.params.id+ '\n');
      var item = req.item;
      dbFields.forEach(elem => {
        if req.body["elem"] != null{
          item[elem] = req.body[elem];
        }
      });
      item.save(function(err,obj){
        if (err) { res.send(err); return }
        res.send(obj)
      })
    })

    //remove one
    router.delete(endpointString  + '/:id',function(req,res){
      console.log("DELETE",endpointString,'/:id \n');
      console.log("delete item",dbName,req.params.id + '\n');
      var id = req.params.id;
      db.findOneAndRemove({_id : new mongoose.mongo.ObjectID(id)}, function(err,item){
        if (err) { res.send(err); return }
        res.send({message:'deleted'});
      });
    })





    router.post("/tratamiento",function(req,res){
      console.log("POST ,tratamiento",'\n');
      res.send(req.body.tratamientos);
    })

    router.get("tratamiento",function(req,res){
      console.log("POST",endpointString,'\n');
      console.log("create item", dbName,dbFields);
      var newObject = new db();
      dbFields.forEach(elem => {
        newObject[elem] = req.body[elem];
      });
      newObject.save(function(err,obj){
        if (err) {res.send(err);return}
        res.send(obj);
      })
    })



  }


  return module;
}




function getDbItemByID(req,res,next){
  var id = req.params.id;
  global.globalDB.findOne({_id:id},function(err,item){
    if (err){ res.send(err); return}
    req.item = item;
    next();
  })

}
