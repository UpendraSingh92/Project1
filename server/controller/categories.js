const Category = require("../model/Category");
const Course = require("../model/Course");


// create new Category controller
exports.createCategory = async (req, res) => {
  try {
    
    // fetch data
    const{name,description} = req.body;

    // validate data
    if(!name || !description){
        return res.status(401).json({
            success: false,
            message: "please fill all details",
        });
    }

    // create entry in DB
    const newCategory = await Category.create({name,description});

    res.status(200).json({
        success: true,
        category:newCategory,
        message: "Category created successfully",
    });

  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal server error in creating category",
        error:error.message,
    });
  }
};


// get all Category controller
exports.showAllCategory = async (req, res) => {
    try {
  
      // search all Category entry in DB
      // name and description should be present
      const newCategory = await Category.find({},{name:true,description:true});
  
      res.status(200).json({
          success: true,
          category:newCategory,
          message: "all Category fetch successfully",
      });
  
    } catch (error) {
      res.status(500).json({
          success: false,
          message: "Internal server error in fetching all category",
          error,
      });
    }
  };
  

// get category page detail
exports.categoryPageDetail = async(req,res)=>{

  try {
    
    // get course based on category Id
    const {categoryId} = req.body;
    
    // fetch courses
    const categoryCourses = await Category.findById(categoryId).populate({
      path: "course",
      populate : {
        path : "ratingAndReview",
      }}).exec();

    // validate
    if(!categoryCourses){
      return res.status(404).json({
        success: false,
        message: "Category Course Not Found",
      });
    }

    // different category course
    const diffCategoryCourse = await Category.find({_id: {$ne : categoryId},}).populate("course").exec();

    // top selling course
    const allCategory = await Category.find().populate({
      path:"course",
      match: {status:"published"}
    })

    //console.log(allCategory);
    const allCourse = allCategory.flatMap( (course)=> course.courses);
    // const mostSell = allCourse.sort( (a,b)=> b.sold - a.sold).sclice(0,10);

    res.status(200).json({
      success: true,
      data:{
        categoryCourses,
        diffCategoryCourse,
        // mostSell,
      },
  });

  } catch (error) {
    res.status(500).json({
          success: false,
          message: "Internal server error in fetching particular category course",
          error: error.message,
      });
  }
}