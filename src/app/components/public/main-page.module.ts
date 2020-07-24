import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CvComponent } from './cv/cv.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NavbarComponent } from './_layout/navbar/navbar.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { LayoutComponent } from './_layout/layout/layout.component';
import { SubGalleryComponent } from './sub-gallery/sub-gallery.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        HomeComponent,
        ContactComponent,
        CvComponent,
        GalleryComponent,
        NavbarComponent,
        FooterComponent,
        LayoutComponent,
        SubGalleryComponent,
        NotFoundComponent
    ],
    imports: [
        RouterModule.forChild([{
            path: '',
            component: LayoutComponent,
            children: [
                {
                    path: "",
                    pathMatch: "full",
                    redirectTo: "home"
                },
                {
                    path: "home",
                    component: HomeComponent
                },
                {
                    path: "contact",
                    component: ContactComponent
                },
                {
                    path: "cv",
                    component: CvComponent
                },
                {
                    path: "gallery",
                    component: GalleryComponent,
                    children: [{ path: ":en", component: SubGalleryComponent }]
                },
                {
                    path: 'page-not-found',
                    component: NotFoundComponent
                }
            ]
        }]
        ),
        SharedModule,
        CommonModule
    ]
})
export class MainPageModule { }