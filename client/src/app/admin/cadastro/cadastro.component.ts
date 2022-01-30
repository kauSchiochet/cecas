import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/cadastro.service';
import { Cadastro } from './cadastro.mode';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [CadastroService]
})
export class CadastroComponent implements OnInit {

  public cadastro: Cadastro = new Cadastro()

  constructor(private cadastroService: CadastroService) { }

  ngOnInit(): void {
  }

  insertName(name: string){
    this.cadastro.name = name
  }
  insertDescription(description: string){
    this.cadastro.description = description
  }

  insertFiles(images: FileList){
    this.cadastro.images = images
  }

  submit(){
    this.cadastroService.efetivarCadastro(this.cadastro).subscribe(response => {
      console.log(response);
    })
  }


}
