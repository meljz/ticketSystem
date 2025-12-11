import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '', 
        pathMatch: 'full',
        loadComponent: () => {
            return import("./dashboard/home/home.component").then(
                m => m.HomeComponent
            );
        },
    },

    {
        path: 'login', 
        loadComponent: () => {
            return import("./auth/login/login.component").then(
                m => m.LoginComponent
            );
        },
    },

    {
        path: 'register', 
        loadComponent: () => {
            return import("./auth/register/register.component").then(
                m => m.RegisterComponent
            );
        },
    },
    {
        path: 'logout', 
        loadComponent: () => {
            return import("./auth/logout/logout.component").then(
                m => m.LogoutComponent
            );
        },
    },

    {
        path: 'home',
        loadComponent: () => {
            return import ("./dashboard/home/home.component").then (
                m => m.HomeComponent
            );
        },
    },

    {
        path: 'kanboard',
        loadComponent: () => {
            return import ("./dashboard/kanboard/kanboard.component").then (
                m => m.KanboardComponent
            );
        },
    },

    {
        path: 'listuser',
        loadComponent: () => {
            return import ("./dashboard/list-users/list-users.component").then (
                m => m.ListUsersComponent
            );
        },
    },

];