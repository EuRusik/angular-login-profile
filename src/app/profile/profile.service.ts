import { Injectable } from '@angular/core';
import {ProfileModule} from "./profile.module";
import {AddressModule} from "./address/address.module";
import {PhoneModule} from "app/profile/phone/phone.module";

@Injectable()
export class ProfileService {

  public allowEditArray: Array<string>;

  public USERNAME = 'username';
  public EMAIL = 'email';
  public ADDRESS = 'address';
  public PHONE = 'phone';

  public user: ProfileModule =
      new ProfileModule(
          'John Doe',
          'john.doe@gmail.com',
          [new AddressModule('Home', '55 East 52nd Street 21st Floor New York, NY 10022'), new AddressModule('Work', '55 East 52nd Street 21st Floor New York, NY 10022')],
          [new PhoneModule('Work', '123-123-1234'), new PhoneModule('Mobile', '123-123-1234')]
      );

  constructor() { }

  getAllowEditArray(): Array<string>{
    return this.allowEditArray = [
        'username',
        'email',
        'address',
        'phone'
    ];
  }

  addAddress(address){
      this.user.address.push(address);
  }

  updateAddress(index: number, address){
      this.user.address[index] = address;
  }

  deleteAddress(index: number){
      this.user.address.splice(index, 1);
  }

  getUserProfile(): ProfileModule{
    return this.user;
  }

  addPhone(phone){
      this.user.phone.push(phone);
  }

  updatePhone(index: number, phone){
      this.user.phone[index] = phone;
  }

  deletePhone(index: number){
      this.user.phone.splice(index, 1);
  }


}
