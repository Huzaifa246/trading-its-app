import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';

async function fetchAllInvestment(userId, investtype, tradeID = "") {
  try {
    let url = `https://itsapp-3606ea51973b.herokuapp.com/api/users/get-user-investment/${userId}/${investtype}`;
    // console.log(url,"main")
    const queryParams = [];

    if (tradeID !== "") {
      queryParams.push(`tradeID=${encodeURIComponent(tradeID)}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    // console.log(url);

    const response = await axios.get(url);
    // console.log(response.data, "data");
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);
    console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at get ALL User Trade:', error);
    return [];
  }
}

export default fetchAllInvestment;
