import axios from 'axios';
import {baseUrl} from '../utils/Constant';

export const GetImages = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${baseUrl}/images`,
    headers: {},
  };

  const result = axios
    .request(config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return 0;
    });

  return result;
};
