import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import {AboutComponent} from './about-component/about.component';
import {LearnComponent} from './learn-component/learn.component';
import {ProjectListComponent} from './project-list/project-list.component'
import { ContactComponent } from './contact/contact.component';
import { RandomAnimeComponent } from './random-anime/random-anime.component';


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
        path: 'projects',
        component: ProjectListComponent,
        title: 'Mes projets',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details projet',
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact'
    },
    {
        path: 'random-anime',
        component: RandomAnimeComponent,
        title: 'Anime Aléatoire'
    },

];
export default routeConfig;