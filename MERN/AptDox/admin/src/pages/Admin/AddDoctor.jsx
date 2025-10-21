import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets.js";
import AdminContext from "../../context/admin-context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { adminToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // if we dont have image choose yet
      if (!docImg) return toast.error("Image Not Selected");
      // other wise hum request send karenge server tak
      // for that we require form data
      const formData = new FormData(); //formData builtin method
      formData.append("image", docImg); // we string docImg as image for backend same name filed as multer
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("degree", degree);
      formData.append("speciality", speciality);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // for test
      // formData.forEach((item,key)=>console.log(item, key))

      const { data } =await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { adminToken } }
      );

      if (data.success) {
        toast.success(data.message);
        // reseting state of forms after form submit
        // setDocImg(false);
        // setName("");
        // setPassword("");
        // setEmail("");
        // setAddress1("");
        // setAddress2("");
        // setAbout("");
        // setFees("");

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      // toast.error(error.message)   
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      {/* main container */}
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-auto">
        {/* inside of conatiner */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>

          <input
            type="file"
            onChange={(e) => setDocImg(e.target.files[0])}
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                id="experience"
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="10+ Year">10+ Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>

          {/* right side  */}
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                className="border rounded px-3 py-2"
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermonlogist">Dermonlogist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="degree"
                required
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">Add Doctor</p>
          <textarea
            className="w-full pt-2 px-4 border rounded"
            type="text"
            placeholder="write about doctor"
            required
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
