import { Routes } from '@angular/router';
import { AppRoutes } from './core/constants/app.routes';
import { PagenotfoundComponent } from './features/errors/pages/pagenotfound/pagenotfound.component';
import { isAuthenticatedGuard } from './core/guards/is-authenticated-guard.guard';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
    {
        path: AppRoutes.APP,
        loadChildren: () => import('./features/public/public.module').then(m => m.PublicModule)
    },
    {
        path: AppRoutes.AUTH,
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: AppRoutes.USER_BASEROUTE,
        canActivate: [isAuthenticatedGuard],
        loadChildren: () => import('./features/user/user.routing.module').then(m => m.UserRoutingModule)
    },
    {
        path: AppRoutes.ADMIN,
        component: AdminLayoutComponent,
        loadChildren: () => import("./features/admin/admin.routing.module").then(m => m.AdminRoutingModule)
    },
    {
        path: AppRoutes.ERROR,
        loadChildren: () => import('./features/errors/errors-routing.module').then(m => m.ErrorsRoutingModule)
    },
    { path: "**", component: PagenotfoundComponent }
];
