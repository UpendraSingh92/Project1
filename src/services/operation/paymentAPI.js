import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {resetCart} from "../../slices/cartSlice"
import {setPaymentLoading} from "../../slices/courseSlice"

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;


function loadScript(scrpt){
  return new Promise((resolve,reject) => {
    const script = document.createElement("script");
    script.src = scrpt;

    script.onload = () => {
      resolve(true);
    }

    script.onerror = () => {
      resolve(false);
    }

    document.body.appendChild(script);
  })
}

export async function buyCourse(token, courses, student, navigate, dispatch) {
  const toastId = toast.loading("Loading..");
  try {
    
    // load script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if(!res){
      toast.dismiss(toastId);
      toast.error("razorpay faild to checkout");
      return;
    }

    // initiate the order
    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                              {courses},{
                                                Authorization: `bearer ${token}`
                                              }
    )

    // console.log(orderResponse.data);
    if(!orderResponse.data.success){
      throw new Error(orderResponse.data.message);
    }

    // options
    const options = {
      "key": process.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      "currency": orderResponse.data.currency,
      "amount": `${orderResponse.data.amount}`, //Default currency is INR. Hence, 50000 refers to 50000 paise.
      "order_id": orderResponse.data.orderId,
      "name": "Study Notion",
      "description": "Thank you for Purchase Course",
      "image": logo,
      "prefill":{
        name: `${student.firstName}`,
        email: student.email,
      },
      handler: function (response){
        // send mail of sucessfull
        sendPaymentSucessEmail(response,orderResponse.data.amount,token)

        // verify payment
        verifyPayment({...response, courses},token, navigate, dispatch)
      }
    }

    // open dialogue box using options
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response){
      toast.error("Payment Failed");
      console.log(response);
    })

  } catch (error) {
    console.log("payment API error ",error);
    toast.error("razorpay faild to payment");
    toast.dismiss(toastId);
  }
  toast.dismiss(toastId);
}


async function sendPaymentSucessEmail(response,amount,token){
  try {
    await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    },{
      Authorization: `bearer ${token}`
    })
  } catch (error) {
    console.log("payment sucess email API error ",error);
    toast.error("payment sucess mail failed to send");
  }
}

// verify payment
async function verifyPayment(bodyData ,token, navigate, dispatch){
  const toastId = toast.loading("Verifying Payment..");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
      Authorization: `bearer ${token}`
    })

    console.log(response);
    if(!response.data.success){
      throw new Error(response);
    }

    toast.success("Payment Successful");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("payment Verify API error ",error);
    toast.error("payment Verify failed");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

