import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormItem, FormBuilder, InputType } from 'src/app/models/FormItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { BehaviorSubject } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import * as JsBarcode from 'jsbarcode';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-build-forms',
  templateUrl: './build-forms.component.html',
  styleUrls: ['./build-forms.component.css']
})

export class AutomaticBuildFormsComponent implements OnInit {
  map: GoogleMap;
  @ViewChild(GoogleMap)
  set Map(mp:GoogleMap){
    this.map = mp;
  } 
  
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  
  marker:google.maps.Marker;
  alertComponent: AlertItem;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  files: { [id: string]: string; } = {};
  barcodes: { [id: string]: string; } = {};
  nextBarcode = new BehaviorSubject<boolean>(false);
  loading: boolean;

  center = { lat:9.936268,lng:-84.1308679 };
  zoom = 17;
  display?: google.maps.LatLngLiteral;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 480,
    'canvasHeight': 300
  };

  @Input() form: FormBuilder;
  formGroup: FormGroup;
  constructor(public router: Router) {
    this.alertComponent = new AlertItem();
    this.nextBarcode.subscribe(res => {
      if (res) {
        this.form.formItems.filter(x => x.type == InputType.barcode).forEach(it => {
          JsBarcode(`#${it.propertyName}`, it.barcode);
        });
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.map);
    if (this.map) {
      this.getCurrentLocation();
      this.form.context = this;
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.map.googleMap.setCenter(pos);
        if(this.marker){
          this.marker.setMap(this.map.googleMap);
          this.marker.setPosition(this.marker.getPosition());
          this.map.googleMap.setCenter(this.marker.getPosition());
        }

        this.map.mapClick.subscribe((res)=> {
          console.log('click',res);
          if(this.marker){
            this.marker.setPosition(res.latLng);
          }
          else
            this.marker = new google.maps.Marker({ position: res.latLng, map: this.map.googleMap});
        })
      })
    }
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  selectOnChange(item:FormItem){
    console.log('Item',item);
    item.selectOnChange();
  }

  private initializeFormGroup() {
    let config = {};
    this.form.formItems.forEach(it => {
      if(it.type == InputType.date){
        let date = new Date();
        console.log('Date',date);
        config[it.propertyName] = new FormControl(`${date.getUTCDay()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`,it.isReadOnly? Validators.required : undefined)
      }else{
        config[it.propertyName] = new FormControl('', it.isRequired ? Validators.required : undefined);
      }
      it.context = this;
    });
    this.formGroup = new FormGroup(config);
    this.form.formItems.forEach(item => {
      if (item.type == InputType.file) {
        this.files[item.propertyName] = item.value;
      } else if (item.type == InputType.barcode) {
        this.barcodes[item.propertyName] = item.value
      }
      else if(item.type == InputType.location){
        this.marker = new google.maps.Marker({map:this.map?.googleMap, position: JSON.parse(item.value)})
      }
      else if(item.type == InputType.date){
        this.formGroup.controls[item.propertyName].setValue(new Date(item.value).toISOString().slice(0, -1))
      }
      else {
        this.formGroup.controls[item.propertyName].setValue(item.value);
      }
    });
  }

  ngAfterViewChecked() {
    this.nextBarcode.next(true);
  }

  register() {
    if (this.form.hasSubmit && this.form.submitText) {
      let output = this.form.returnType;
      this.form.formItems.forEach(it => {
        if (it.type == InputType.file) {
          output[it.propertyName] = this.files[it.propertyName];
        }
        else if (it.type == InputType.select) {
          if(it.sourceValueIsObjet){
            output[it.propertyName] = it.source.find(x => x[it.sourceValue] == this.formGroup.controls[it.propertyName].value)[it.propertyName];
          }else{
            output[it.propertyName] = it.source.find(x => x[it.sourceValue] == this.formGroup.controls[it.propertyName].value);
          }
        }
        else if (it.type == InputType.number) {
          var p = Number(this.formGroup.controls[it.propertyName].value);
          output[it.propertyName] = p;
        }
        else if (it.type == InputType.barcode) {
          output[it.propertyName] = this.barcodes[it.propertyName];
        }
        else if(it.type == InputType.location){
          output[it.propertyName] = JSON.stringify(this.marker.getPosition());
        }
        else if(it.type == InputType.hidden){
          if(it.propertyName == 'id'){
            output[it.propertyName] = <number>this.formGroup.controls[it.propertyName].value;
          }
          else{
            output[it.propertyName] = this.formGroup.controls[it.propertyName].value;
          }
        }
        else {
          output[it.propertyName] = this.formGroup.controls[it.propertyName].value;
        }
      });

      if (this.formGroup.valid) {
        this.form.submit(output, this.form.service);
      }
      else {
        this.alertComponent.type = 'warning';
        this.alertComponent.timer = 2500;
        this.alertComponent.title = 'Error';
        this.alertComponent.text = 'Hay campos requeridos, por favor completarlos';
        this.alertComponent.Show();
      }
    }
    else {
      console.error("Missing Reference to Submit Event");
    }
  }

  clear() {
    if (this.form.hasCancel && this.form.cancel) {
      if (this.form.hasCancelConfirmation) {
        this.form.cancelConfirmation().then(res => {
          this.initializeFormGroup();
          this.form.cancel(this.formGroup);
        }
        )
      } else {
        this.form.cancel(this.formGroup, this.form);
        // this.initializeFormGroup();
      }
    } else {
      console.error("Missing Reference to Cancel Event");
    }
  }

  clearSignature(sP:SignaturePad){
      sP.clear();
  }

  fileChangeEvent(fileInput: any, propertyName: string) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/jpg', 'image/jpeg', 'image/png'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.files[propertyName] = imgBase64Path;
            // this.formGroup.controls[propertyName].setValue(this.cardImageBase64);
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }

}
