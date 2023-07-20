import axios from 'axios'

const endpoints = {
  ask: 'charge-gpt/ask',
};

const apiUrlBase = 'https://api.fronyx.io/api';

const doRequest = async (text, conversationId) => {

  const apiUrl = `${apiUrlBase}/${endpoints.ask}`;
  const body = {
    text,
  };

  return axios.post(apiUrl,
      body,
    {
      params: conversationId ? { conversationId } : undefined,
      headers: {
        'x-api-token': _apiKey,
      }
    })
    .then((response) => {
      return response.data;
    });
}


let _apiKey;

export default class ChargeGPT {
  constructor (apiKey) {
    _apiKey = apiKey;
    this.conversationId = undefined;
  }

  async request(text) {
    return doRequest(text, this.conversationId);
  }
};
