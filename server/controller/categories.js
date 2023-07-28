const Category = require("../model/Category");


// create new Category controller
exports.createCategory = async (req, res) => {
  try {
    
    // fetch data
    const{name,description} = req.body;

    // validate data
    if(!name || !description){
        res.status(401).json({
            sucess: false,
            message: "please fill all details",
        });
    }

    // create entry in DB
    const newCategory = await Category.create({name,description});

    res.status(200).json({
        sucess: true,
        category:newCategory,
        message: "Category created sucessfully",
    });

  } catch (error) {
    res.status(500).json({
        sucess: false,
        message: "Internal server error in creating category",
        error,
    });
  }
};


// get all Category controller
exports.createCategory = async (req, res) => {
    try {
  
      // search all Category entry in DB
      // name and description should be present
      const newCategory = await Category.find({},{name:true,description:true});
  
      res.status(200).json({
          sucess: true,
          category:newCategory,
          message: "Category created sucessfully",
      });
  
    } catch (error) {
      res.status(500).json({
          sucess: false,
          message: "Internal server error in fetching all category",
          error,
      });
    }
  };
  