import axios from "axios";

interface IReqSignup {
  username: string;
  password: string;
}

interface IResSignup {
  id: number;
  username: string;
  passwords: string;
}

export async function signupAPI(body: IReqSignup) {
  return axios.post<IResSignup>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, body);
}