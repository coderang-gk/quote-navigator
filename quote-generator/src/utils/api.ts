import axios from 'axios';
import { Quote } from '../types/Quote';

const BASE_URL = 'https://dummyjson.com/quotes';

export const fetchQuotes = async (limit: number, skip: number): Promise<Quote[]> => {
  const response = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return response.data.quotes;
};

export const fetchRandomQuote = async (): Promise<Quote> => {
  const response = await axios.get(`${BASE_URL}/random`);
  return response.data;
};
