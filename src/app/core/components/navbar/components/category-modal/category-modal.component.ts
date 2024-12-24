import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/core/models';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent  implements OnInit{
 @Input() categories:Category[];

 imgBaseUrl = environment.imageBaseUrl;


 constructor(private router:Router,private modalService:NgbModal,
    public imagesFallbackService: ImagesFallbackService,
    ){}
    ngOnInit(): void {


    }

 onCategoryClicked(categoryId: number): void {
    this.router.navigateByUrl('/products?categoryId=' + categoryId);
    this.modalService.dismissAll("Accept click");
}
}
