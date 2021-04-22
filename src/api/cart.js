import {API_URL, PRODUCTS} from '../utils/constants';
import {uniqBy, countBy} from 'lodash';

export function addProductCartApi(idProd){
    const products = getCartApi();
    products.push(idProd);

    localStorage.setItem(PRODUCTS,JSON.stringify(products));
}

export function getCartApi(){
    const products = localStorage.getItem(PRODUCTS);
    if(!products) return [];

    return JSON.parse(products);
}

export async function getProductsCartApi(){
    const idProducts = getCartApi();

    if(idProducts.lenght === 0) return null;

    try {
        const products = [];
        for await (const idP of idProducts){
            const response =  fetch(`${API_URL}/products/${idP}`);
            const result = await response.json();
            products.push(result);
        }

        const productsCount = countBy(products, (p)=>{
            return p.name;
        });

        const combined = uniqBy(products, (p)=>{
            const pTemp = p;
            pTemp.quantity = productsCount[p.name];
            return pTemp.name;
        })
        console.log(combined);
    } catch (error) {
        console.log(error);
        return null;
    }
}