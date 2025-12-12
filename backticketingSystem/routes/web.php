<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

/* -------------------BACKEND ENDPOINTS API for users (login/register purpose)-------------------*/
$router->post('/register', 'AuthController@register');
$router->post('/login', 'AuthController@login');
$router->post('/logout', 'AuthController@logout');
$router->get('/user', 'AuthController@index');

/* -----------------BACKEND ENDPOINTS API for tickets--------------------*/
$router->group(['prefix' => 'api/tickets'], function () use ($router){
    $router->get('/', 'TicketController@index');      //this will list all users
    $router->post('/', 'TicketController@store');      // this will input then store user in db
    $router->get('/{id}', 'TicketController@show');  //  this will get user specifically
    $router->put('/{id}', 'TicketController@update');   //this will update users
    $router->delete('/{id}', 'TicketController@destroy');   //this will delete specific user
    $router->put('/{id}/assign', 'TicketController@assign');   //working na, but logic is incorrect pa 
});