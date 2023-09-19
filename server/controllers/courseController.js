const Course = require("../model/courseModel");

const courseController = {
  getCourse:async(req,res)=>{
     console.log("Coming...");
     try {
      // Retrieve the four latest blogs from the database
      const blogs = await Course.find({})

      // Return the blog details
      res.json(blogs);
      // console.log(blogs);
    } catch (error) {
      console.error("Error retrieving blog details:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
  

module.exports = courseController;
