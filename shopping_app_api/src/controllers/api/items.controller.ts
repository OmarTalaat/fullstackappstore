import { NOTFOUND } from "dns";
import {  Request, Response } from "express";
import itemService from "../../services/item-services";





const addProductToOrder = async(req:Request,res:Response ) => {
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const orderId = parseInt(req.params.orderId)
          const productId = parseInt(req.body.productId)
          const itemToreturn =await itemService.getItemInOrderbyproductandorderid(productId,orderId)
          if ( itemToreturn?.productid) {
            var  quantity =itemToreturn.quantity +1
            const update_quantity =await itemService.update_quantity_Item(itemToreturn.itemid ,quantity)
            res.status(200).json({item:{id:update_quantity.itemid, quantity:update_quantity.quantity}})
          }else{
            const quantity: number = parseInt(req.body.quantity)
          const addProductToOrder = await itemService.addProduct(quantity,orderId,productId);
          res.status(200).json(addProductToOrder) 
          }
    } catch (err) {
       throw new Error(`can not add item to Order error:${err}`) 
    }
}

const getItem_detailes =async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
    
            const itemId:number = parseInt(req.params.itemId)
 
    
            const Item_detailes =await itemService.getItem_detailes(itemId)
            if (Item_detailes == null) {
                res.json('this item not found')
                return NOTFOUND
            }
            res.status(200).json(Item_detailes)
    } catch (err) {
        throw new Error(`can not get item detailes  error:${err}`) 
    }
}
const update_quantity_Item =async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const itemId:number = parseInt(req.params.itemId)
            const quantity: number = parseInt(req.body.quantity)
            const update_quantity =await itemService.update_quantity_Item(itemId,quantity)
            res.status(200).json({item:{id:update_quantity.itemid, quantity:update_quantity.quantity}})
    } catch (err) {
        throw new Error(`can not update item  error:${err}`) 
    }

}

const removeItem =async(req:Request,res:Response)=>{
    try {
        if (req.params.userId  != req.body.decoded.id) {
            return res.status(401).send({message: "Unauthorized!"});}
            const removeItem = await itemService.deleteItem(parseInt(req.params.itemId))
            res.status(200).json({message: 'the item removed successfully'})
    } catch (err) {
        throw new Error(`can not remove item  error:${err}`) 
    }
}



const items_Controller = {
    addProductToOrder,
    update_quantity_Item,
    removeItem,
    getItem_detailes
}


export default items_Controller;