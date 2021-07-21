import axios from 'axios'; 
const BASE_URL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11';


export const fetchRate = async () => {
    const { data } = await axios.get(BASE_URL)
    return data;
}