import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { ItemImage } from 'src/app/models/Image';
import { Machine } from 'src/app/models/Machine';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { AppService } from 'src/app/Services/app-service';
import { ImageService } from 'src/app/Services/image.service';
import { MachineService } from 'src/app/Services/machine.service';
import { ProjectsService } from 'src/app/Services/projects.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  serviceName: string;
  propertyName: string;
  itemId: string;
  itemName: string = '';
  service: AppService<Machine | Project>;
  images: Array<ItemImage>;
  item: Machine | Project;
  formGroup: FormGroup;
  files: { [id: string]: string; } = {};
  config: { [id: string]: FormControl; } = {};
  imageError:string;
  cardImageBase64: string;
  isImageSaved: boolean;
  isReady:boolean = false;
  alertComponent: AlertItem;


  constructor(private injector: Injector, private route: ActivatedRoute, 
    private imageService: ImageService, private router: Router) {
    this.images = new Array<ItemImage>();
    this.alertComponent = new AlertItem();
  }

  ngOnInit(): void {
    this.serviceName = this.route.snapshot.paramMap.get("service");
    this.propertyName = this.route.snapshot.paramMap.get("property");
    this.itemId = this.route.snapshot.paramMap.get("id");
    this.getService();

    this.loadItemInformation();    
  }

  async loadItemInformation() {
    debugger;
    await this.service.getById(Number(this.itemId)).toPromise().then(res => {
      this.item = res;      
      this.initilizeInformation();
    });
    await this.imageService.getByItemType(Number(this.itemId), this.serviceName).toPromise().then(res => {
      if (res.length > 0) {
        res.forEach(it => this.images.push(it));
      }
      else{
        let img = new ItemImage();
        img.itemId = Number(this.itemId);
        img.itemType = this.serviceName;
        this.images.push(img);
      }
      this.InititilizeFormGroup();
      console.log('Images', res);
    });
  }

  InititilizeFormGroup(){
    this.images.forEach(it => {
      this.config[`${this.images.indexOf(it)}-${it.itemId}`] = new FormControl('', Validators.required);
      this.files[`${this.images.indexOf(it)}`] = it.img;
    });
    this.formGroup = new FormGroup(this.config);
    this.isReady = true;
  }

  pushNewImage(){
    let img = new ItemImage();
    img.itemId = Number(this.itemId);
    img.itemType = this.serviceName;
    this.images.push(img);
    this.InititilizeFormGroup();

  }

  removeFomrImage(index:number){
    this.images.splice(index,1);
    this.InititilizeFormGroup();
  }

  saveImages(){
    this.isReady = false;
    this.imageService.newMany(this.images).subscribe(res => {
      this.alertComponent.text = 'Imagenes guardadas exitosamente!';
      this.alertComponent.type = 'success';
      this.alertComponent.Show().then(res => {
        this.isReady = false;
        this.redirectToList();        
      });
    })
  }

  redirectToList(){
    let url = '';
    switch (this.serviceName) {
      case 'machine':
        url = 'machine-list';
        break;
      case 'project':
        url = 'project-list';
        break;
    }
    this.router.navigate([url]);
  }

  initilizeInformation() {
    switch (this.serviceName) {
      case 'machine':
        this.itemName += `${this.item['brand']} ${this.item['model']}  ${this.item['machineId']}`;
        break;
      case 'project':
        this.itemName += this.item['name'];
        break;
    }
  }

  getService() {
    switch (this.serviceName) {
      case 'machine':
        this.service = this.injector.get(MachineService);
        this.itemName += 'Imagenes de la Maquina/Equipo: ';
        break;
      case 'project':
        this.service = this.injector.get(ProjectsService);
        this.itemName += 'Imagenes del Proyecto: ';
        break;
    }

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
            (<ItemImage>this.images[propertyName]).img = imgBase64Path;
            // this.formGroup.controls[propertyName].setValue(this.cardImageBase64);
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }


}
