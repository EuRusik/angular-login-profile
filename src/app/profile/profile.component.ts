import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProfileService} from "./profile.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  public editMode: boolean = false;
  public numIndex: number;
  public profile;
  public hide: string;
  public AllowArray: Array<string>;
  public profileForm: FormGroup;
  public enabledSaveAddress: boolean = false;
  public disabledAddAddress: boolean = false;
  public enabledSavePhone: boolean = false;
  public disabledAddPhone: boolean = false;
  public showHideForm: boolean = false;

  constructor(public profileService: ProfileService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){

    let addressArray = new FormArray([]);
    let phonesArray = new FormArray([]);

    this.profile = this.profileService.getUserProfile();

    if (this.profile.address){
      for (let address of this.profile.address){
        addressArray.push(new FormGroup({
          'title': new FormControl(address.title, [Validators.required, Validators.maxLength(50)]),
          'address': new FormControl(address.address, [Validators.required, Validators.maxLength(150)])
        }));
      }
    }

    if (this.profile.phone){
      for (let phone of this.profile.phone){
        phonesArray.push(new FormGroup({
          'title': new FormControl(phone.title, [Validators.required, Validators.maxLength(50)]),
          'phone': new FormControl(phone.phone, [Validators.required, Validators.maxLength(20)])
        }));
      }
    }

    this.profileForm = new FormGroup({
      'username': new FormControl(this.profile.name, [Validators.required, Validators.maxLength(50)]),
      'email': new FormControl(this.profile.email, [Validators.required, Validators.email, Validators.maxLength(50)]),
      'addresses': addressArray,
      'phones': phonesArray
    });
  }

  onEdit(type: string, index: number = null){
    this.AllowArray = this.profileService.getAllowEditArray();
    if (this.AllowArray.indexOf(type) !== -1){
        this.hide = type;
        this.numIndex = index;
        this.editMode = true;
        this.showHideForm = true;
    }
  }

  onSave(){
    this.hide = '';
  }

  isAllowAddress(param: number){
    if (this.profileService.getUserProfile().address.length < param){
      return true;
    }
    return false;
  }

  isAllowPhone(param: number){
    if (this.profileService.getUserProfile().phone.length < param){
      return true;
    }
    return false;
  }

  onAddAddress(type: string){
    if (this.isAllowAddress(5)){
      this.disabledAddAddress = true;
      (<FormArray>this.profileForm.get('addresses')).push(new FormGroup({
        'title': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        'address': new FormControl(null, [Validators.required, Validators.maxLength(150)])
      }));
      this.hide = type;
      this.numIndex = this.profileForm.value['addresses'].length - 1;
      this.editMode = false;
      this.enabledSaveAddress = true;
      this.showHideForm = true;
    }
  }

  onSaveAddress(){
    let addressArray: Array<any>;
    addressArray = this.profileForm.value['addresses'];
    if (this.isAllowAddress(5)){
      this.disabledAddAddress = false;
      this.profileService.addAddress(addressArray[addressArray.length - 1]);
      this.showHideForm = false;
    }
    this.enabledSaveAddress = false;
  }

  updateAddress(index: number){
    let addressArray = this.profileForm.value['addresses'];
    let userProfile = this.profileService.getUserProfile();
    userProfile.address[index] = addressArray[index];
  }

  deleteAddress(index: number){
    this.showHideForm = false;
    (<FormArray>this.profileForm.get('addresses')).removeAt(index);
    this.profileService.deleteAddress(index);
  }

  onAddPhone(type: string){
    if (this.isAllowPhone(5)) {
      this.disabledAddPhone = true;
      (<FormArray>this.profileForm.get('phones')).push(new FormGroup({
        'title': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
        'phone': new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)])
      }));
      this.hide = type;
      this.numIndex = this.profileForm.value['phones'].length - 1;
      this.editMode = false;
      this.enabledSavePhone = true;
      this.showHideForm = true;
    }
  }

  onSavePhone(){
    let phoneArray: Array<any>;
    phoneArray = this.profileForm.value['phones'];
    if (this.isAllowPhone(5)){
      this.disabledAddPhone = false;
      this.profileService.addPhone(phoneArray[phoneArray.length - 1]);
      this.showHideForm = false;
    }
    this.enabledSavePhone = false;
  }

  updatePhone(index: number){
    let phoneArray = this.profileForm.value['phones'];
    let userProfile = this.profileService.getUserProfile();
    userProfile.phone[index] = phoneArray[index];
  }

  deletePhone(index: number){
    this.showHideForm = false;
    (<FormArray>this.profileForm.get('phones')).removeAt(index);
    this.profileService.deletePhone(index);
  }





}
