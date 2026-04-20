import { Routes } from '@angular/router';

const routeConfig: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./home/home.component').then(m => m.HomeComponent),
        title: 'Loïs Odiardo - Portfolio',
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./about-component/about.component').then(m => m.AboutComponent),
        title: 'À propos',
    },
    {
        path: 'learn',
        loadComponent: () =>
            import('./learn-component/learn.component').then(m => m.LearnComponent),
        title: 'Apprentissages',
    },
    {
        path: 'projects',
        loadComponent: () =>
            import('./project-list/project-list.component').then(m => m.ProjectListComponent),
        title: 'Mes projets',
    },
    {
        path: 'details/:id',
        loadComponent: () =>
            import('./details/project-details.component').then(m => m.ProjectDetailsComponent),
        title: 'Détails projet',
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./contact/contact.component').then(m => m.ContactComponent),
        title: 'Contact',
    },
    {
        path: 'random-anime',
        loadComponent: () =>
            import('./random-anime/random-anime.component').then(m => m.RandomAnimeComponent),
        title: 'Anime Aléatoire',
    },
    {
        path: 'everyone-john',
        loadComponent: () =>
            import('./everyone-john/everyone-john.component').then(m => m.EveryoneJohnComponent),
        title: 'Everyone is John',
    },
    {
        path: 'cobblemon',
        loadComponent: () =>
            import('./cobblemon/cobblemon.component').then(m => m.CobblemonComponent),
        title: 'Cobblemon académie',
    },
    {
        path: 'blind-study',
        loadComponent: () =>
            import('./blind-study/blind-study.component').then(m => m.BlindStudyComponent),
        title: 'BlindStudy',
    },
];

export default routeConfig;