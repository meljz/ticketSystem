import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '', 
        pathMatch: 'full',
        loadComponent: () => {
            return import("./home/home.component").then(
                m => m.HomeComponent
            );
        },
    },

    {
        path: 'todos', 
        loadComponent: () => {
            return import("./todos/todos.component").then(
                m => m.TodosComponent
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
        path: 'home',
        loadComponent: () => {
            return import ("./home/home.component").then (
                m => m.HomeComponent
            );
        },
    },
];