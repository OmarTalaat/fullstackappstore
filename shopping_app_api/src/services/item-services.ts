import { ItemDetailsDto } from "../database/dtos/itemDtos/itemDetailsDto";
import { ItemListDto } from "../database/dtos/itemDtos/itemListDto";
import { ProductDetailsDto } from "../database/dtos/productDtos/productDetailsDto";
import itemrepo from "../database/repository/item.repo";
import orderRepo from "../database/repository/order.repo";
import productRepo from "../database/repository/products.repo";








const addProduct= async(quantity: number, orderId: number, productId: number) =>{
    try {
        
        const order = await orderRepo.getOrderById(orderId)
       /*  if(order.status !== 'Active'){
            return `Could not add product  because order status is ${order.status}`
        } */
        
        const itemtoreturn = await itemrepo.addProduct(quantity,orderId,productId);
        const productToreturn =await productRepo.getproductByid(productId)

        var item:ItemDetailsDto
        var product:ProductDetailsDto
        product= {id:productToreturn.productid ,name:productToreturn.name ,price:productToreturn.price}
        
           item={id:itemtoreturn.itemid,quantity:itemtoreturn.quantity, product:product}
           return item
    } catch (err) {
        throw new Error(` you can not add ${productId} to your order : ${err} `)
    }
}

const getItem_detailes = async(itemId:number) =>{
    try {
        const itemToreturn = await itemrepo.getItem_detailes(itemId);
        if (itemToreturn) {
            const productId = itemToreturn.productid
        const productToreturn = await productRepo.getproductByid(productId)

        var item:ItemDetailsDto
        var product:ProductDetailsDto
        product ={id:productToreturn.productid, name:productToreturn.name, price:productToreturn.price}
        return item={id:itemToreturn.itemid, quantity:itemToreturn.quantity ,product:product  }
        } else {
            return null
        }
        
    } catch (err) {
        throw new Error(` you can not get item detailes with id ${itemId} error : ${err} `)
    }
}

const getItemListInOrder = async(orderId:number) => {
    try {
        const itemsToreturn = await itemrepo.getitemsbyorder(orderId);
        let items = await Promise.all( itemsToreturn.map(  async item =>{
            let itemdetails :ItemDetailsDto;
            var product:ProductDetailsDto
            const productToreturn = await productRepo.getproductByid(item.productid)
            product ={id:productToreturn.productid, name:productToreturn.name, price:productToreturn.price}
            itemdetails={id:item.itemid, quantity:item.quantity ,product:product}
            return itemdetails;
        }));
        return items
      
    } catch (error) {
        
    }
}

const getItemInOrderbyproductandorderid = async(productId: number , orderId:number) =>{
    const itemtobecheck = await itemrepo.getitembyordernadproduct(productId,orderId);
    if (itemtobecheck) {
        const item = await itemrepo.getitembyordernadproduct(productId,orderId);
        return item
    } else {
        return null
    }
   
}

const update_quantity_Item = async(itemId:number,quantity:number) => {

    try {
        const update_quantity = await itemrepo.update_quantity_Item(itemId,quantity)

        return update_quantity
    } catch (err) {
        throw new Error(` you can not update item with Id: ${itemId} error: ${err} `)
    }
}

const deleteItem =async(itemId:number) =>{
    try {
        const removeItem = await itemrepo.deleteItem(itemId)

        return removeItem
    } catch (err) {
        throw new Error(` you can not delete item with Id: ${itemId} error: ${err} `)
    }
}


const itemService ={
    addProduct,
    update_quantity_Item,
    deleteItem,
    getItem_detailes,
    getItemListInOrder,
    getItemInOrderbyproductandorderid
}

export default itemService;