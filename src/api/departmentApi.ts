import axios from "axios";
import { Department } from "@/model/department";

const host = "http://localhost:8080";
const path = "/departments";

export function fetchDepartments(): Promise<Department[]> {
  return axios
    .get(host + path)
    .then((response) => response.data as Department[]);
}
