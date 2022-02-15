import { Routes } from "@angular/router";
import { CadastroComponent } from "./admin/cadastro/cadastro.component";
import { UserComponent } from "./admin/user/user.component";
import { ViewCadastrosComponent } from "./admin/view-cadastros/view-cadastros.component";
import { ViewComponent } from "./view/view.component";

export const ROUTES: Routes = [
    {
        path:"", component: UserComponent
    },
    {
        path: 'login', component: UserComponent
    },
    {
        path: 'view-cadastros', component: ViewCadastrosComponent
    },
    {
        path: 'cadastro', component: CadastroComponent
    },
    {
        path: 'edicao/:id', component: CadastroComponent
    },
    {
        path: 'view/:id', component: ViewComponent
    }
]