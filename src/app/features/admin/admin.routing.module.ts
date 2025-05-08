import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { BulkscreeningComponent } from "./pages/bulkscreening/bulkscreening.component";
import { RealtimescreeningComponent } from "./pages/realtimescreening/realtimescreening.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutes } from "../../core/constants/app.routes";

const routes: Routes = [
    { path: AppRoutes.ADMIN_DASHBOARD, component: DashboardComponent },
    {
        path: AppRoutes.ADMIN_SCREENING,
        children: [
            { path: AppRoutes.ADMIN_SCREENING_BULK, component: BulkscreeningComponent },
            { path: AppRoutes.ADMIN_SCREENING_REALTIME, component: RealtimescreeningComponent }
        ]
    }
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})

export class AdminRoutingModule { }