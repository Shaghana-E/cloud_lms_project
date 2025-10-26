// src/api.js
import axios from "axios";
import { getIdToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://kotqfk3v41.execute-api.eu-north-1.amazonaws.com"
});

api.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export async function listCourses() {
  return api.get("/courses");
}

export async function addCourse(data) {
  return api.post("/courses", data);
}

export async function enrollCourse(courseId) {
  return api.post("/en/enroll", { courseId });
}

export async function getMyCourses() {
  return api.get("/my-courses");
}

export default api;
