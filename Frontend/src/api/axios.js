// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // لاحظ: ما تزيدش /api هنا، خليه في الطلبات فقط
  withCredentials: true, // مهم بزاف باش تبعث الكوكي
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default instance;
