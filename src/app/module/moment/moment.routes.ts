/* Moment Feature Module Routes */

import { AddMomentComponent } from '../moment/add-moment/add-moment.component';
import { ListMomentComponent } from '../moment/list-moment/list-moment.component';

export const momentRoutes = [
    {path:'moment', component: AddMomentComponent },
    {path:'listMoment', component:ListMomentComponent}
];