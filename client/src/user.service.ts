import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "jquery";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./app/model/user.model";
import { ErrorComponent } from "./app/error/error.component";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }

    public login(user: User): Observable<any> {
        let endpoint = `/api/user/login`
        return this.http.post(endpoint, user)
        .pipe(
                catchError(this.handleError)
            )
    }

    public getDigitalizacoes(): Observable<unknown> {
        let endpoint = `/api/user/getdigitalizacoes`
        let token = `Bearer ${sessionStorage.token}`;
        return this.http.get(endpoint, {
            headers: {
                "authorization": token
            }
        })
            .pipe(
                catchError(this.handleError)
            )
    }

    private handleError(error: HttpErrorResponse) {
        let errorComponent = new ErrorComponent();
        errorComponent.showError(error.error.err)
        return throwError(
            'Something bad happened; please try again later.');
    }
}