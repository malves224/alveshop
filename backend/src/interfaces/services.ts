export interface ServiceConsult<TM> {
  findOne(id: string | number): Promise<TM>,

  findAll(objTerm?: { [x: string]: string | undefined }): Promise<TM[]>

}

export interface ServiceComplete<T, TM> extends ServiceConsult<TM> {

  create(obj: T): 
  Promise<{ [x: string]: number | string, message: string }>,

  update(id: string | number, obj: T): 
  Promise<[number, TM[]]>,

  delete(id: string | number): Promise<void>

}

export interface ServiceWallet<T, TM> extends ServiceConsult<TM> {
  update(id: string | number, obj: T): Promise<[number, TM[]]>,
  incrementCoins(id: string | number, coin: number | string)
  : Promise<[number, TM[]]>,
  decrementCoins(id: string | number, coin: number | string)
  : Promise<[number, TM[]]>,
}

export interface ServiceSearch<T, TM, TS> extends ServiceComplete<T, TM> {
  findAllSearch(termsSearch: TS): Promise<TM[]>
}