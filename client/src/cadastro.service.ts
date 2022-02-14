import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs"
import { catchError, map } from "rxjs/operators";
import { Cadastro } from "./app/admin/cadastro/cadastro.model"

@Injectable()
export class CadastroService {
    constructor(private http: HttpClient) { }

    private formDataCadastro(cadastro: Cadastro) : FormData {
        let form = new FormData();
        form.append('name', cadastro.name);
        form.append('htmlContent', cadastro.editorModel) 
        return form
    }

    public getCadastro(id: BigInteger): Observable<unknown> {
        let token = `Bearer ${sessionStorage.token}`;
        let endpoint = `/api/digitalizacao/${id}`
        return this.http.get(endpoint,{headers: {"authorization": token}})
            .pipe(
                catchError(this.handleError)
                )
    }

    public getAllCadastro(): Observable<unknown> {
        let endpoint = `/api/digitalizacao/`
        return this.http.get(endpoint)
            .pipe(
                catchError(this.handleError)
                )
    }

    public efetivarCadastro(cadastro: Cadastro): Observable<unknown> {
        let token = `Bearer ${sessionStorage.token}`;
        return this.http.post("/api/digitalizacao", this.formDataCadastro(cadastro), 
        {headers: {"authorization": token}})
            .pipe(
                catchError(this.handleError)
                )
    }

    public editarCadastro(cadastro: Cadastro): Observable<unknown> {
        let token = `Bearer ${sessionStorage.token}`;
        let endpoint = `/api/digitalizacao/${cadastro.id}`
        return this.http.put(endpoint, this.formDataCadastro(cadastro),{headers: {"authorization": token}})
            .pipe(
                catchError(this.handleError)
                )
    }

    public deleteCadastro(id: BigInteger): Observable<unknown> {
        let token = `Bearer ${sessionStorage.token}`;
        let endpoint = `/api/digitalizacao/${id}`
        return this.http.delete(endpoint, {headers: {"authorization": token}})
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