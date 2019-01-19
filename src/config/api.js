import axios from "axios";
import { API_HOST, API_PORT } from "react-native-dotenv";

export default axios.create({
  baseURL: `http://${API_HOST}:${API_PORT}/`
});
