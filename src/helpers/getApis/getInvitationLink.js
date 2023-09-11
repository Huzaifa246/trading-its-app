import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function InvitationLink(userId) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/create-invitation-link/${userId}`;

    // console.log(url);

    const response = await axios.get(url,
      {
        headers: UserHeader,
      }
    );
    console.log(response);
    // console.log(response.data, "data");
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);
    // console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at get ALL User Trade:', error);
    return error;
  }
}

export default InvitationLink;
