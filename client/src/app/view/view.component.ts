import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/cadastro.service';
import { Cadastro } from '../model/cadastro.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [CadastroService]
})
export class ViewComponent implements OnInit {


  public cadastro: Cadastro = new Cadastro();

  constructor(private cadastroService: CadastroService) { }

  ngOnInit(): void {
    const path = window.location.pathname.split("/");
    let id = path[2] as unknown as BigInteger;

    this.cadastroService.getCadastro(id).subscribe((response: any) => {
      this.cadastro.id = response.id;
      this.cadastro.name = response.name;
      this.cadastro.editorModel = response.htmlContent;
      console.log(this.cadastro)
    })
    
  }

}
