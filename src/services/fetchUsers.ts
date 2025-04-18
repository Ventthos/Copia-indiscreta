import { getJson } from "./getJson";
import { operadoresUrl } from "../config/apiUrls";

export async function getOperador(){
    return await getJson(operadoresUrl)
}