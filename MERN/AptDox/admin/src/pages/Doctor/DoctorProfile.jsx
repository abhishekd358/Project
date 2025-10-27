import React, { useContext, useEffect, useState } from "react";
import DoctorContext from "../../context/doctor-context/DoctorContext";
import AppContext from "../../context/app_context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { getDocProfile, profileData, doctorToken, setProfileData,backendUrl } =
    useContext(DoctorContext);
    

  const {currency } = useContext(AppContext);

  // calling the funcgion to get Docotr progilr
  useEffect(() => {
    if (doctorToken) {
      getDocProfile();
    }
  }, [doctorToken]);

  // state for edit click or not
  const [isEdit, setIsEdit] = useState(false);


  // ================= doctor update profile field
  const updateProfile = async () => {
    try {

      // save the data seapratley to pass to db

      const updateData = {
        address: profileData.address,
        fees:profileData.fees,
        available:profileData.available,
      }

        const {data} = await axios.put(`${backendUrl}/api/doctor/update-profile`,updateData, {headers:{doctorToken}})

        if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          getDocProfile()
        }else{
          toast.error(data.message)
        }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }





  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          {/* doctor profile image */}
          <div>
            <img
              className="bg-blue-400 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>

          {/* doctor info */}
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>

            {/* docotr degrre and speciality */}
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}
              </button>
            </div>

            {/* about doctor */}
            <div className="">
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            {/* fees */}
            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    type="number"
                    name="fees"
                    value={profileData.fees}
                    id=""
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            {/* address */}
            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev, address:{...prev.address, line1:e.target.value},
                      }))
                    }
                    type="text"
                    value={profileData.address.line1}
                    id=""
                  />
                ) : (
                  profileData.address.line1
                )}
              </p>
              <br />
              <p>{ isEdit ? (
                  <input
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev, address:{...prev.address, line2:e.target.value},
                      }))
                    }
                    type="text"
                    value={profileData.address.line2}
                    id=""
                  />
                )  : profileData.address.line2}</p>
            </div>

            <div className="flex gap-1 pt-2">
              <input
                onChange={()=> isEdit && setProfileData(prev=>({...prev, available: !prev.available}))}
                checked={profileData.available}
                type="checkbox"
                name=""
                id=""
                className="cursor-pointer"
              />
              <label htmlFor="">Available</label>
            </div>

            {/* btn  */}
            {isEdit ? (
              <button onClick={updateProfile} className="px-4 border text-sm rounded-full mt-5 py-1 bg-blue-400 text-white cursor-pointer">
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 border border-blue-400 text-sm rounded-full mt-5 py-1 hover:bg-blue-400 hover:text-white cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
