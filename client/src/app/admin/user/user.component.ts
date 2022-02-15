import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  public user: User = new User();
  public activateRouterLink: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  submit(user: String, password: String) {
    this.user.username = user;
    this.user.password = password;
    this.userService.login(this.user)
      .subscribe((response: any) => {
        let token = response.token
        if(token != null)
          this.activateRouterLink = true
          sessionStorage.setItem("token", token);
      });

  }
}
