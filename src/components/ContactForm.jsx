import React, { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { countryCodeWithFlag, servicesData } from "../assets/data";

const ContactForm = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [service,setService] = useState('')
    const [about,setAbout] = useState('')
    const [country,setCountry] = useState('')
    const[loading,setLloading] = useState(false);

    const formData =  {name,email,phoneNumber,service,about,country}
    const handleSubmit =async(e)=>{
        e.preventDefault();
        setLloading(true);
        try{
          const respose =  await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/add-contact`,formData)
        if(!respose.data.success){
          console.log(respose.data.message);
          console.log("unable to submit the form")
          toast.error("Submission failed");

        }
        toast.success("Query submited successfully.")
        }catch(error){
          toast.error(error.message)
        }finally{
        
      setName("");
      setEmail("");
      setAbout("");
      setService("");
      setCountry("");
      setPhoneNumber("")
      setLloading(false);
        }
      
    }


  return (
    <form onSubmit={handleSubmit}>
        <div>
            <p className="text-2xl font-semibold text-gray-300">Tell Us What You Nedd</p>
        </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mt-12">
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="text-xs text-gray-600">
            Your Name/Company Name <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            required
            onChange={(e)=>setName(e.target.value)}
            value={name}
            className="w-full p-2 outline-none border-gray-700 bg-gray-300/10 border-[1px] rounded-md mt-2 text-gray-400 text-sm"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-xs text-gray-600">
            Your Email <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className="w-full p-2 outline-none border-gray-700 bg-gray-300/10 border-[1px] rounded-md mt-2 text-gray-400 text-sm "
          />
        </div>
      </div>

      <div className="flex flex-col w-full mt-4">
          <label htmlFor="email" className="text-xs text-gray-600">
            Phone Number <span className="text-red-400">*</span>{" "}
          </label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            required
            onChange={(e)=>setPhoneNumber(e.target.value)}
            value={phoneNumber}
            className="w-full p-2 outline-none border-gray-700 bg-gray-300/10 border-[1px] rounded-md mt-2 text-gray-400 text-sm "
          />
        </div>

      <div className="flex flex-col w-full mt-4">
          <label htmlFor="name" className="text-xs text-gray-600">
            I Need <span className="text-red-400">*</span>{" "}
          </label>
            <select
            required
            onChange={(e)=>setService(e.target.value)}
            value={service}
            className="w-full p-2 outline-none border-gray-700 bg-gray-300/10 border-[1px] rounded-md mt-2 text-gray-400 text-sm"
            >
                <option value="">Select a service</option>
                {
                  servicesData.map((service)=>(
                    <option value={service.title} key={service.id}>{service.title}</option>
                  ))
                }
            </select>
        </div>


         <div className="flex flex-col w-full mt-4">
          <label htmlFor="email" className="text-xs text-gray-600">
            About Your Project <span className="text-red-400">*</span>{" "}
          </label>
          <textarea
            type="text"
            placeholder="Tell us about your project, goals, and any specific requirements."
            required
            onChange={(e)=>setAbout(e.target.value)}
            value={about}
            className="w-full h-[150px] p-2 outline-none border-gray-700 bg-gray-300/10 border-[1px] rounded-md mt-2 text-gray-400 text-sm "
          />
        </div>



      <div className="flex flex-col w-full mt-4">
          <label htmlFor="name" className="text-xs text-gray-600">
            Country <span className="text-red-400">*</span>{" "}
          </label>
            <select
            required
            onChange={(e)=>setCountry(e.target.value)}
            value={country}
            className="w-full p-2 outline-none border-gray-700 bg-gray-300/10 border-[1px] rounded-md mt-2 text-gray-400 text-sm"
            >
                <option value="">Select your country</option>
                {
                  countryCodeWithFlag.map((country)=>(
                  <option value={country.name} key={country.name}>{country.flag} {country.code} {","} {country.name}  </option>
                  ))
                }
            </select>
        </div>
        <div className="w-full mt-12 ">
            <button  
            disabled={loading}
            className="white bg-colortext hover:bg-colortext/50 transition-all duration-200 rounded-md w-full p-4 font-semibold cursor-pointer">
                { loading  ? "Please Wait..."  : "Send My Request"}
            </button>
        </div>
    </form>
  );
};

export default ContactForm;
