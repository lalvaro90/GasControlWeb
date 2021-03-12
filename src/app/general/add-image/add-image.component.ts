import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemImage } from 'src/app/models/Image';
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
  service: any;
  images: Array<ItemImage>;

  constructor(private injector: Injector, private route: ActivatedRoute) {
    this.images = new Array<ItemImage>();
  }

  ngOnInit(): void {
    this.serviceName = this.route.snapshot.paramMap.get("service");
    this.propertyName = this.route.snapshot.paramMap.get("property");
    this.itemId = this.route.snapshot.paramMap.get("id");
  }

  getService() {
    switch (this.serviceName) {
      case 'machine':
        this.service = this.injector.get(MachineService);
        break;
      case 'user':
        this.service = this.injector.get(UserService);
        break;
      case 'project':
        this.service = this.injector.get(ProjectsService);
        break;
    }

  }


}
