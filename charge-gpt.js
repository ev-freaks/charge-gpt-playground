import axios, { AxiosHeaders } from 'axios'

const endpoints = {
  ask: 'charge-gpt/ask',
  start: 'charge-gpt/start',
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
      headers: new AxiosHeaders({ 'x-api-token': _apiKey }),
    })
    .then((response) => {
      return response.data;
    });
}

const doStart = async (language, currentTimestamp = Date.now()) => {

  const apiUrl = `${apiUrlBase}/${endpoints.start}`;
  return axios.get(apiUrl,
    {
      params: { language, currentTimestamp },
      headers: new AxiosHeaders({ 'x-api-token': _apiKey }),
    })
  .then((response) => {
    return response.data.conversationId;
  });
}

let _apiKey;

export default class ChargeGPT {
  constructor (apiKey) {
    _apiKey = apiKey;
    this.conversationId = undefined;
  }

  async start(language = 'en') {
    const conversationId = await doStart(language);
    this.conversationId = conversationId;

    return conversationId;
  }

  async request(text) {
    if (!this.conversationId) {
      await this.start();
    }

    return await doRequest(text, this.conversationId);
  }
};
