const mailSender = require("../utils/mailSender");

// create new Category controller
exports.contactUs = async (req, res) => {
  try {
    
    // fetch data
    const{firstName,lastName,phNumber,message,email} = req.body;

    // validate data
    if(!firstName ||!lastName ||!phNumber ||!email || !message){
        res.status(401).json({
            success: false,
            message: "please fill all details",
        });
    }

    // mail to student that we got your feedback
    
    const studentMailRes = mailSender(email,`${firstName} ${lastName} we receive your message`,"thank you for connect us");
    
    // mail the message to your account vishalSupport
    const sendToYourMail = mailSender("vishalbavakumar0000@gmail.com",
                    `${firstName} ${lastName} want contact us`,
                    `phone No ${phNumber}
                    email ${email}
                    message : ${message}`);

    res.status(200).json({
        success: true,
        data:studentMailRes,
        message: "contact us mail send successfully",
    });

  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal server error in sending contact us mail",
        error,
    });
  }
};
