import {Client, Account} from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('650b180481bcf5f14296');

export {client};
