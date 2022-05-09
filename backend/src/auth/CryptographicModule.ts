import * as argon2 from 'argon2';

export default class CryptographicModule {
  constructor(
    public module = argon2,
  ) {}

  async generateHash(password: string) {
    try {
      const hashValue = await this.module.hash(password);
      const hashStringDismembered = hashValue.split('$');
      const onlyHash = hashStringDismembered[hashStringDismembered.length - 1];
      return onlyHash;
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  }

  async checkPasswordHash(password: string, hash: string) {
    try {
      const isValid = await this.module
        .verify(`$argon2i$v=19$m=4096,t=3,p=1$${hash}`, password);
      return isValid;
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
    }
  }
}