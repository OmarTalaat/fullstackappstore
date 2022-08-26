import Item from "./item";



type Order =  {
   orderid: number;
   status: string;
   userId: number;
   items:Item[];
}


export default Order;

