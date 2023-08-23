import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function fetchAllInvestment(userId, investtype, tradeID = "") {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/get-user-investment/${userId}/${investtype}`;

    const queryParams = [];

    if (tradeID !== "") {
      queryParams.push(`tradeID=${encodeURIComponent(tradeID)}`);
    }

    if (queryParams?.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    // console.log(url);

    const response = await axios.get(url,
      {
        headers: UserHeader,
      }
    );
    console.log(response)
    // console.log(response.data, "data");
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);
    // console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at get ALL User Trade:', error);
    return [];
  }
}

export default fetchAllInvestment;
