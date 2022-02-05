import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/cadastro.service';
import { Cadastro } from './cadastro.mode';
import Quill from 'quill';
import BlotFormatter from 'quill-blot-formatter';
import 'quill-emoji/dist/quill-emoji.js'

Quill.register('modules/blotFormatter', BlotFormatter);

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [CadastroService]
})

export class CadastroComponent implements OnInit {

  public cadastro: Cadastro = new Cadastro();
  modulesQuill = {};

  constructor(private cadastroService: CadastroService) { 
    this.modulesQuill = {
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
      blotFormatter: {
        // empty object for default behaviour.
      },
      'toolbar': {
        container: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video'],                         // link and image, video
          ['emoji'],
        ],
        handlers: { 'emoji': function () { } },

      }
    }
  }

  ngOnInit(): void {
  }

  insertName(name: string) {
    this.cadastro.name = name
  }
  insertDescription(description: string) {
    this.cadastro.description = description
  }

  insertFiles(images: FileList) {
    this.cadastro.images = images
  }

  submit() {
    this.cadastroService.efetivarCadastro(this.cadastro).subscribe(response => {
      console.log(response);
    })
  }

  ngModel() {

  }


}
