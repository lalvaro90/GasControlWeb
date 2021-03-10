import { AlertItem } from '../helpers/AlertItem';
import { Router } from '@angular/router';
import { Type } from '@angular/core';

export class FormBuilder{
  formName:string;
  hasSubmit:boolean;
  hasCancel:boolean;
  hasPrint: boolean;
  hasCancelConfirmation:boolean;
  submit:Function;
  cancel:Function;
  submitText:string;
  cancelText:string;
  printText:string;
  printSectionId:string;
  printStyleRef:string;
  cancelConfirmation:Function;
  formItems:Array<FormItem>;
  returnType:Object;
  service:any;
  alertComponent: AlertItem;
  router:Router;
  mainItemId: any;
}

export class FormItem {

  Id:number;
  name:string;
  propertyName:string;
  type:InputType;
  prefix:string;
  placeHolder: string;
  source:Array<any>
  sourceText:string;
  secondText:string;
  sourceValue:string;
  value:any;
  img:string;
  barcode:string;
  inGroup:boolean;
  groupName:string;
  isRequired:boolean;
  isReadOnly:boolean;
  textMask: any;

}

export enum InputType{
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetimeLocal = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
  select = 'select',
  cancel = 'cancel',
  barcode = 'barcode',
  textarea = 'textarea',
  location = 'location',
}
