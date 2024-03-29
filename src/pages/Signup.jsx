/* eslint-disable no-unused-vars */
import { message } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import singUpImg from "../assets/images/Sign-up-v2.png";
import { bloodGroupOptions } from "../constrains/Global";
import { useAddPatientMutation } from "../redux/api/patient/patientApi";

const Signup = () => {
  const navigate = useNavigate();

  const [selectFile, setSelectFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2a4xxU0NG6NU0MrfhXkenFNvNMFScB1eDRokLNrMP8seq585qB4EKsddo-1_T6WDTu1g&usqp=CAU",
    gender: "",
    role: "patient",
    bloodType: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //* image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectFile(file);
      setPreviewUrl(reader.result);

      // Set the photo in formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: file,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  //* password icon visibility
  const [passwordShow, setPasswordShow] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow);
  };

  //*signUp api handler
  const [addPatient] = useAddPatientMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if the email contains "@gmail.com"
    if (!formData.email.includes("@gmail.com")) {
      toast.error("Invalid Email");
      return;
    }
    try {
      message.loading("Please wait...");
      const res = await addPatient(formData);
      // console.log(res);
      res?.data?.id && toast.success("patient data inserted successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }

    // console.log(formData);
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* img  */}

          <div className="hidden lg:block bg-primaryColor rounded-lg">
            <figure className="rounded-lg">
              <img src={singUpImg} alt="" className="w-full rounded-lg" />
            </figure>
          </div>

          {/* singUP form  */}

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an{" "}
              <span className="text-primaryColor font-bold">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              {/* name  */}
              <div className="mb-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  className="w-full px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* phone  */}
              <div className="mb-5">
                <input
                  type="number"
                  name="phone"
                  placeholder="Enter Your Phone number"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  className="w-full px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* email  */}
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  className="w-full  px-4  py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
              </div>

              {/* password  */}
              <div className="mb-5 relative">
                <input
                  type={!passwordShow ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData?.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer placeholder:text-lg"
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-5 right-0"
                >
                  {passwordShow ? (
                    <FaEyeSlash className="w-10" />
                  ) : (
                    <FaEye className="w-10" />
                  )}
                </span>
              </div>

              {/* dropdown  */}
              <div className="mb-5 flex items-center justify-between">
                {/* role dropdown */}

                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Select Blood Group
                  <select
                    name="bloodType"
                    value={formData?.bloodGroup}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value=""> Select</option>
                    {bloodGroupOptions.map((bloodGroup) => (
                      <option key={bloodGroup.value} value={bloodGroup.value}>
                        {bloodGroup.label}
                      </option>
                    ))}
                  </select>
                </label>

                {/* gender dropdown */}
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData?.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value=""> Select</option>
                    <option value="male"> Male</option>
                    <option value="female"> Female</option>
                  </select>
                </label>
              </div>

              {/* signup btn  */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  // onClick={handleLogin}
                >
                  Register{" "}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
