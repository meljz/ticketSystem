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

$router->post('/register', 'AuthController@register');
$router->post('/login', 'AuthController@login');
$router->get('/user', 'AuthController@index');


$router->group(['prefix' => 'api/tickets'], function () use ($router){
    $router->get('/', 'TicketController@index');
    $router->post('/', 'TicketController@store');
    $router->get('/{id}', 'TicketController@show');
    $router->put('/{id}', 'TicketController@update');
    $router->delete('/{id}', 'TicketController@destroy');
    $router->put('/{id}/assign', 'TicketController@assign');
});