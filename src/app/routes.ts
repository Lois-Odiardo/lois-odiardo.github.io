import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import {AboutComponent} from './about-component/about.component';
import {LearnComponent} from './learn-component/learn.component';


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Loïs Odiardo - Portfolio',
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'learn',
        component: LearnComponent
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
    },
];
export default routeConfig;