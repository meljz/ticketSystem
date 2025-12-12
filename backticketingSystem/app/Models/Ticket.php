<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = ['title', 'status', 'assigned_to'];

    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}
