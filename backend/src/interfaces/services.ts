export interface ServiceConsult<TM> {
  findOne(id: string | number): Promise<TM>,

  findAll(): Promise<TM[]>

}

export interface ServiceComplete<T, TM> extends ServiceConsult<TM> {

  create(obj: T): Promise<TM>,

  update(id: string | number, obj: T): Promise<TM>,

  delete(id: string | number): Promise<void>

}

export interface ServiceWallet<T, TM> extends ServiceConsult<TM> {
  update(id: string | number, obj: T): Promise<TM>,
  increment(id: string | number, coin: number | string): Promise<TM>,
  decrement(id: string | number, coin: number | string): Promise<TM>,
}

export interface ServiceSearch<T, TM, TS> extends ServiceComplete<T, TM> {
  findAllSearch(termsSearch: TS): Promise<TM[]>
}