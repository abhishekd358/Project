import { UserDB } from "../models/userModel.js";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ message: "Enter the Prompt", success: false });
    }

    // Search for the user
    const user = await UserDB.findById(req.userId);
    if (!user) {
      return res.json({ message: "User not found...", success: false });
    }

    // Check user credit
    if (user.credit <= 0) {
      return res.json({
        message: "No Credit Left...",
        creditBalance: user.credit,
        success: false,
      });
    }

    // Step 1: Send generation request to AI Horde
    const urlPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${urlPrompt}`;

     // Pollinations secured API endpoint
    const pollinationAPI = `https://image.pollinations.ai/openai?token=${process.env.POLLINATIONS_API_KEY}`;

    const response = await axios.post(
      pollinationAPI,
      {
        prompt,
        model: "turbo",
        width: 720,
        height: 1280,
        seed: 28312,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    //  const seed = 42;
    // const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;

    console.log(response)


    // Test that the URL returns an image
    const result = await axios.head(imageUrl);

    if (!result) {
      return res.json({ message: "Image generation timeout", success: false });
    }

    // Deduct 1 credit from the user
    user.credit -= 1;
    await user.save();

    return res.json({
      message: "Image generated successfully",
      success: true,
      resultImage: imageUrl, // Base64 URL or CDN URL
      creditBalance: user.credit,
    });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};





























// import { UserDB } from "../models/userModel.js";
// import axios from 'axios'
// export const generateImage = async (req, res)=>{
//     try{
//         const {prompt} = req.body

//         if(!prompt){
//             return res.json({message:'Enter the Prompt', success:false})
//         }
//         // now we search for the user
//         const user = await UserDB.findById(req.userId)
//         // if we get user
//         if(!user){
//             return res.json({message:'User not found...', success:false})
//         }

//         // check the user credit
//         if(user.credit <= 0){
//             return res.json({message:'No Credit Lefts...',creditBalance:user.credit,  success:false})
//         }

//         // here we making a call for ai horde
//         const response = await axios.post('https://stablehorde.net/api/v2/generate/async', {
//             prompt:prompt,
//             params:{
//                 sampler_name: "k_euler",
//                 width: 512,
//                 height: 512,
//                 steps:20
//             },

//         },{
//             headers:{
//                 'content-Type': 'application/json',
//                 'apikey': '0000000000'
//             }
//         });

//     // ai horde return a message with request id
//     const {id} = response.data

//     }
// }
