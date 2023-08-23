// import axios from "axios";
// import { decryptData } from "../encryption_decryption/Decryption";

// // const key = CryptoJS.enc.Utf8.parse("ED6C504C24FD3140D42E3BFE9F92E4A1");

// async function AuthSession() {
//   let token = localStorage.getItem("token");

//   if (token) {
//     const authUrl = `${import.meta.env.VITE_APP_API}/api/users/auth/${token}`;
//     try {
//       const authResponse = await axios.get(authUrl);
//       let decryptedData = decryptData(authResponse.data.data);

//       console.log(decryptedData, "dcytData of session")
//       if (decryptedData) {
//         localStorage.setItem("mySession", JSON.stringify(decryptedData));
//       } else {
//         localStorage.setItem("session", JSON.stringify(decryptedData));
//       }

//       return true;
//     } catch (authError) {
//       localStorage.removeItem("token");
//       return false;
//     }
//   } else {
//     return false;
//   }
// }

// export default AuthSession;
