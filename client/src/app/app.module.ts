import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CadastroComponent } from './admin/cadastro/cadastro.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewCadastrosComponent } from './admin/view-cadastros/view-cadastros.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule, AlertConfig } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { UserComponent } from './admin/user/user.component';

import { RouterModule } from '@angular/router';
import { ROUTES } from './app.router';
import { ErrorComponent } from './error/error.component';
import { ViewComponent } from './view/view.component';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CadastroComponent,
    ViewCadastrosComponent,
    UserComponent,
    ErrorComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxQRCodeModule,
    QuillModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AlertConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
