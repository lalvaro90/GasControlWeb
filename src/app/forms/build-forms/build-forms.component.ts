import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormItem, FormBuilder, InputType } from 'src/app/models/FormItem';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { BehaviorSubject, Subject } from 'rxjs';
import * as JsBarcode from 'jsbarcode';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { Configuration } from 'src/app/models/Configuration';

@Component({
  selector: 'app-build-forms',
  templateUrl: './build-forms.component.html',
  styleUrls: ['./build-forms.component.css']
})

export class AutomaticBuildFormsComponent implements OnInit {
  map: any = {};
  // localData:any;
  private stop$ = new Subject();
  public config:Configuration;
  @ViewChild(GoogleMap)
  set Map(mp: GoogleMap) {
    this.map = mp;
  }

  @ViewChild(SignaturePadComponent)
  public signaturePad!: SignaturePadComponent;

  fileReader!: any;
  currentProperty!: string;
  audio!: HTMLAudioElement;
  audioProgress: string = '0';
  currentTime: string = '0';
  audioUrl:string = '';

  marker: MarkerProperties [] = [];
  alertComponent: AlertItem;
  imageError!: string;
  isImageSaved!: boolean;
  cardImageBase64!: string;
  files: { [id: string]: any; } = {};
  barcodes: { [id: string]: string; } = {};
  nextBarcode = new BehaviorSubject<boolean>(false);
  loading!: boolean;
  itemId:number = 0;

  center = { lat: 9.936268, lng: -84.1308679 };
  zoom = 17;

  public signaturePadOptions: NgSignaturePadOptions  = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 480,
    'canvasHeight': 300
  };

  @Input()
  form!: FormBuilder;
  formGroup!: FormGroup;
  constructor(public router: Router,
    public route: ActivatedRoute) {
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
    if (this.map) {
      this.getCurrentLocation();
    }
    this.form.context = this;
  }

  clickMap(event: any) {
    this.marker.push({ position: { lat: event.latLng.lat(), lng: event.latLng.lng()}} );
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.map.googleMap.setCenter(pos);
        if (this.marker.length>0) {
          this.map.googleMap.setCenter(this.marker[0].position)
        }        
      })
    }
  }

  ngOnInit(): void {
    // this.audioUrl = `${environment.artistApi}Track/streamAudio/`
    this.initializeFormGroup();
  }

  selectOnChange(item: FormItem) {
    if (item.selectOnChange)
      item.selectOnChange();
  }

  inputOnChange(item: FormItem) {
    if (item.onChange)
      item.onChange(item);
  }

  private initializeFormGroup() {
    let config: any = {};
    this.form.formItems.forEach(it => {
      const validators = new Array<ValidatorFn>();
      if (it.isRequired) validators.push(Validators.required);
      if (it.customeValidator) validators.push(it.customeValidator);

      if (it.type == InputType.date) {
        let date = new Date();
        config[it.propertyName] = new FormControl(`${date.getUTCDay()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`, validators);
      } else {
        config[it.propertyName] = new FormControl('', validators);
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
      else if (item.type == InputType.location) {
        if(item.value.length > 1)
          this.marker.push({position: JSON.parse(item.value)});
      }
      else if (item.type == InputType.date) {
        const date = new Date(item.value);
        this.formGroup.controls[item.propertyName].setValue(date?.toISOString().slice(0, -1))
      }
      else if (item.type == InputType.audio) {
        this.itemId = this.form.formItems.find(x => x.propertyName == 'id')?.value;
        // this.audio = new Audio(`${this.audioUrl}${this.itemId}/${this.localData.token.value}`);
        this.files[item.propertyName] = `${this.audioUrl}${this.itemId}`;
        this.InitAudioPlayer(undefined);
      }
      else {
        this.formGroup.controls[item.propertyName].setValue(item.value);
      }
    });
  }

  ngAfterViewChecked() {
    if(this.nextBarcode)
      this.nextBarcode.next(true);
  }

  register() {
    this.loading = true;
    if (this.form.hasSubmit && this.form.submitText) {
      let output: any = this.form.returnType;
      this.form.formItems.forEach(it => {
        if (it.type == InputType.file || it.type == InputType.audio) {
          output[it.propertyName] = this.files[it.propertyName];
        }
        else if (it.type == InputType.select) {
          if (it.sourceValueIsObjet) {
            output[it.propertyName] = it.source.find(x => x[it.sourceValue] == this.formGroup.controls[it.propertyName].value)[it.propertyName];
          } else {
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
        else if (it.type == InputType.location) {
          output[it.propertyName] = JSON.stringify(this.marker[0].position);
        }
        else if (it.type == InputType.hidden) {
          if (it.propertyName == 'id') {
            output[it.propertyName] = <number>this.formGroup.controls[it.propertyName].value;
          }
          else {
            output[it.propertyName] = this.formGroup.controls[it.propertyName].value;
          }
        }
        else {
          output[it.propertyName] = this.formGroup.controls[it.propertyName].value;
        }
      });

      if (this.formGroup.valid) {
        this.form.submit(output, this.form.service);
        if (this.audio)
          this.audio.pause();
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
        this.form.cancelConfirmation().then(() => {
          this.initializeFormGroup();
          this.form.cancel(this.formGroup);
          if (this.audio) {
            this.audio.pause();
          }
        }
        )
      } else {
        this.form.cancel(this.formGroup, this.form);
        if (this.audio) {
          this.audio.pause();
        }
        // this.initializeFormGroup();
      }
    } else {
      console.error("Missing Reference to Cancel Event");
    }
  }

  clearSignature(sP: SignaturePadComponent) {
    sP.clear();
  }

  fileChangeEvent(fileInput: any, propertyName: string, isAudio: boolean = false) {
    this.imageError = '';
    this.currentProperty = propertyName;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 104857600;
      let allowed_types = ['image/jpg', 'image/jpeg', 'image/png'];
      let allowedTypes = "JPG | PNG | JPEG";

      if (isAudio) {
        allowed_types = ['audio/mpeg', 'audio/mp4']
        allowedTypes = "MP3 | MP4";
      }


      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + (max_size / 1024)/1024 + 'Mb';

        return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = `Only Images are allowed ( ${allowedTypes} )`;
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fileReader = e;
        if (isAudio) {
          this.InitAudioPlayer(fileInput.target.files[0]);
        }
        else {
          const image = new Image();
          image.src = e.target.result;
          image.onload = (rs: any) => this.ImageOnload(rs);
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      return false;
    }
    return false;
  }

  dataURLtoFile(dataurl:any, filename:any) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}

  InitAudioPlayer(base64: any) {
    if(base64)
      this.audio = new Audio(URL.createObjectURL(base64));
    //this.audio.src = e.target.result;
    this.audio.ontimeupdate = (ev: Event) => {
      this.audioProgress = ((this.audio.currentTime / this.audio.duration) * 100).toFixed(1);
    }

    this.currentTime = (Number(`${this.audio.currentTime / 60}`)).toFixed(2)
    this.audio.onloadedmetadata = (rs: any) => this.AudioOnload(rs);
  }

  ImageOnload(rs: any) {
    const max_height = 15200;
    const max_width = 25600;

    const img_height: any = rs.currentTarget['height'];
    const img_width: any = rs.currentTarget['width'];

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
      const imgBase64Path = this.fileReader.target.result;
      this.cardImageBase64 = imgBase64Path;
      this.files[this.currentProperty] = imgBase64Path;
      // this.formGroup.controls[propertyName].setValue(this.cardImageBase64);
      this.isImageSaved = true;
      // this.previewImagePath = imgBase64Path;
    }
    return false;
  };

  AudioOnload(rs: any) {
    const imgBase64Path = this.fileReader.target.result;
    console.log(rs.currentTarget);
    const blob = base64StringToBlob(imgBase64Path, 'audio/mpeg');
    this.cardImageBase64 = imgBase64Path;
    this.files[this.currentProperty] = imgBase64Path;
    // this.formGroup.controls[propertyName].setValue(this.cardImageBase64);
    this.isImageSaved = true;
    return true;
  };

  playPause() {
    if (this.audio.paused) {
      this.audio.play();
    }
    else {
      this.audio.pause();
    }
  }

  getDuration() {
    return (parseFloat(`${this.audio.duration / 60}`)).toFixed(2)
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
  }

  removeImage() {
    this.cardImageBase64 = '';
    this.isImageSaved = false;
  }

}

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};

function base64StringToBlob(b64Data: any, contentType: any): Blob {
  const byteCharacters = btoa(b64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: contentType });
  return blob;
}
