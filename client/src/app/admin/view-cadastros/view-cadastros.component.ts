import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cadastros',
  templateUrl: './view-cadastros.component.html',
  styleUrls: ['./view-cadastros.component.css']
})
export class ViewCadastrosComponent implements OnInit {
  options = { fullWidth: false };
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
