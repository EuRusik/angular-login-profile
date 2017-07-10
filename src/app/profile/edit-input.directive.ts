import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appEditInput]'
})
export class EditInputDirective {

  constructor() { }

  @HostBinding('class.hide') isHide = false;

  @HostListener('click') toggleHide(){
    this.isHide = !this.isHide;
  }

}
