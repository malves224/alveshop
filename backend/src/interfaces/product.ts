export interface IProduct {
  id?: string,
  name: string,
  urlImage: string,
  price: number,
}

export interface IProductSale {
  idProduct: number | string, 
  quantity: number | string,
}