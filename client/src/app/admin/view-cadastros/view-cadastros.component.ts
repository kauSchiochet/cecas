import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/cadastro.service';
import { UserService } from 'src/user.service';
import { CadastroView } from './cadastrosview.model';

@Component({
  selector: 'app-view-cadastros',
  templateUrl: './view-cadastros.component.html',
  styleUrls: ['./view-cadastros.component.css'],
  providers: [UserService, CadastroService]
})
export class ViewCadastrosComponent implements OnInit {

  cadastros!: CadastroView[];

  options = { fullWidth: false };
  constructor(private userService: UserService, private cadastroService: CadastroService) { }

  ngOnInit(): void {
    this.refresh()
  }

  ngAfterViewInit() {
  }

  refresh(){
    this.cadastros = [];
    this.userService.getDigitalizacoes().subscribe(response => {
      this.cadastros = response as CadastroView[]
      console.log(this.cadastros)
    })
  }

  delete(id: BigInteger): void{
    this.cadastroService.deleteCadastro(id).subscribe(response => {
      console.log(response)
      this.refresh()
    })
  }

}
