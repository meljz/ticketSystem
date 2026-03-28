<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\MockuserSeed;

class DatabaseSeeder extends Seeder
{
    
    public function run()
    {
        $this->call(MockuserSeed::class);
    }
}
