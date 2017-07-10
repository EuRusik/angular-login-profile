import {AddressModule} from "./address/address.module";
import {PhoneModule} from "./phone/phone.module";
export class ProfileModule {

  public name: string;
  public email: string;
  public address: AddressModule[];
  public phone: PhoneModule[]

  constructor(name: string, email: string, address: AddressModule[] = null, phone: PhoneModule[] = null){
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
  }

}
