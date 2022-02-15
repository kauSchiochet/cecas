import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CadastroService } from 'src/cadastro.service';
import { UserService } from 'src/user.service';
import { CadastroView } from '../../model/cadastrosview.model';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-view-cadastros',
  templateUrl: './view-cadastros.component.html',
  styleUrls: ['./view-cadastros.component.css'],
  providers: [UserService, CadastroService]
})
export class ViewCadastrosComponent implements OnInit {

  cadastros!: CadastroView[];
  modalRef!: BsModalRef;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  cadastroQrCode!: CadastroView;
  modalQrValue = '';

  options = { fullWidth: false };
  constructor(private userService: UserService, private cadastroService: CadastroService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.refresh()
  }

  ngAfterViewInit() {
  }

  gerarQrModal(template: TemplateRef<any>, cadastro: CadastroView) {
    this.cadastroQrCode = cadastro;
    let cadastroId = cadastro.id as any;
    this.modalQrValue = `${window.location.origin}/digitalizacao/${cadastroId}`;
    this.modalRef = this.modalService.show(template);
  }

  public downloadQRCode() {
    const fileNameToDownload = this.cadastroQrCode.name;
    const base64Img = (document.getElementsByClassName('coolQRCode')[0].children[0] as any)['src'];
    fetch(base64Img)
      .then(res => res.blob())
      .then((blob) => {
        // IE
        //if (window.navigator && window.navigator.msSaveOrOpenBlob){
        //   window.navigator.msSaveOrOpenBlob(blob,fileNameToDownload);
        //} else { // Chrome
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileNameToDownload;
        link.click();
        //}
      })
  }

  refresh() {
    this.cadastros = [];
    this.userService.getDigitalizacoes().subscribe(response => {
      this.cadastros = response as CadastroView[]
      console.log(this.cadastros)
    })
  }

  delete(id: BigInteger): void {
    this.cadastroService.deleteCadastro(id).subscribe(response => {
      console.log(response)
      this.refresh()
    })
  }

}
