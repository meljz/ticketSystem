<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MockuserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Mock User 1',
                'email' => 'mockuser1@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Mock User 2',
                'email' => 'mockuser2@example.com',
                'password' => Hash::make('password123'),
            ],
        ]);
    }
}