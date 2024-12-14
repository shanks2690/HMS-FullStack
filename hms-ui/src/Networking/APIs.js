import { GetCall, PostCall, PostCallNoPayload } from "./Calls";
import { allUsersURL, authURL, getAllReqsURL, orgURL, regAllReqsURL, registerUserURL } from "./URLs";
export const LoginCall = (payload)=>PostCall(authURL,payload);
export const GetAllUsers = () => GetCall(allUsersURL,sessionStorage.getItem('jwt'));
export const GetRegistrationRequests = () => GetCall(getAllReqsURL,sessionStorage.getItem('jwt'));
export const RegAllRequests = () => PostCallNoPayload(regAllReqsURL,sessionStorage.getItem('jwt'));
export const RegisterNewUser = (payload) => PostCall(registerUserURL,payload);
export const Organisation = () => GetCall(orgURL,sessionStorage.getItem('jwt'));