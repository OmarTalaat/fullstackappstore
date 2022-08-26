import { ProductDetailsDto } from "../database/dtos/productDtos/productDetailsDto";
import productRepo from "../database/repository/products.repo";



const getproductsbycategory = async(categoryId:number) => {
    try {
        const productsToReturn = await productRepo.getAllproductsbycategory_repo(categoryId);
        
        let products= Promise.all(productsToReturn.map(pro => {
            let product:ProductDetailsDto
            product={id:pro.productid , name:pro.name,price:pro.price}
            return product
        }))
        return products
        
    } catch (err) {
        throw new Error(`can not get products due to ${err}`)
    }
}

const getproductbyId = async(productId:number) => {
    try {
        const productToreturn = await productRepo.getproductByid(productId);

        let product:ProductDetailsDto;

        return product={id:productToreturn.productid, name: productToreturn.name , price: productToreturn.price};
    } catch (err) {
        throw new Error(`can not get this product error${err}`)
    }
}


const productsService = {
    getproductsbycategory,
    getproductbyId
}


export default productsService;