const Employe = require("../models/Employee")

exports.createEmployee = async (req,res) => {
    try{
        const {
            f_Id,
            f_Image,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Createdate
        } = req.body;

        if (!f_Id || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await  Employe.findOne({ f_Email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists.' });
        }

        const newUser = new Employe({
            f_Id,
            f_Image,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Createdate: f_Createdate ? new Date(f_Createdate) : undefined
        });

        await newUser.save();
        return res.status(200).json({
            status: 201,
           message: "Employee created successfully",
          data: newUser,
        })




        

    } catch(error) {
        console.log("error", error);
       return res.status(500).json({
      status: 500,
      message: error.message,
    });
    }
}

exports.employeeList = async (req,res) => {
    try{
        const employData = await Employe.find({});
		return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data: employData, 
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error : error.message,
        })
    }
}

exports.employe = async (req,res) => {
    try {
        const employee = await Employe.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }
        res.status(200).json({
            success: true,
            data: employee
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

}


exports.updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            f_Id,
            f_Image,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Createdate
        } = req.body;

       

        if (!f_Id || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Find the employee by email
        const employeDetails = await Employe.findOneAndUpdate(
            { f_Email: f_Email }, // Query to find the employee by email
            {
                f_Id: f_Id,
                f_Image: f_Image,
                f_Name: f_Name,
                f_Email: f_Email,
                f_Mobile: f_Mobile,
                f_Designation: f_Designation,
                f_gender: f_gender,
                f_Course: f_Course,
                f_Createdate: f_Createdate ? new Date(f_Createdate) : undefined
            },
            { new: true, runValidators: true } // Options: return the updated document and run validation
        );

        if (!employeDetails) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        return res.status(200).json({
            success: true,
            message: 'Employee details updated successfully.',
            data: employeDetails
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot update",
            error: error.message,
        });
    }
}

exports.deleteEmploye = async (req, res) => {
    try {
        const id = req.params.id;
        const EmpoDetails = await Employe.findById(id);
        if(!EmpoDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        }

        await Employe.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Employee cannot be deleted',
        });
    }
};

exports.search = async (req,res) => {
    const { query } = req.query;
    try {
        const employees = await Employe.find({
            $or: [
                { f_Name: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search by name
                { f_Email: { $regex: new RegExp(query, 'i') } } // Case-insensitive search by email
            ]
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





