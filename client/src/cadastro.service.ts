import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs"
import { catchError, map } from "rxjs/operators";
import { Cadastro } from "./app/admin/cadastro/cadastro.mode"

@Injectable()
export class CadastroService {
    constructor(private http: HttpClient) { }

    public efetivarCadastro(cadastro: Cadastro): Observable<unknown> {
        let form = new FormData();
        form.append('name', cadastro.name);
        form.append('description', cadastro.description)
        form.append('htmlContent', cadastro.editorModel)
        if (cadastro.images != undefined) {
            for (let i = 0; i < cadastro.images.length; i++) {
                const image = cadastro.images[i];
                form.append('images', image)
            }
        }

        return this.http.post("/api/cadastro", form)
            .pipe(
                catchError(this.handleError)
                )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }

}