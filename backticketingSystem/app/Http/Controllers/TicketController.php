<?php
namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(){
        return response()->json(Ticket::with('user')->get());
    }

    public function store(Request $request){
            $this->validate($request, [
                'title' => 'required|string|max:255',
                'status' => 'in:todo,in-progress,done'
            ]);

            $ticket = Ticket::create([
                'title' => $request->title,
                'status' => $request->status ?? 'todo',
                'assigned_to' => $request->assigned_to ?? null
            ]);

            return response()->json($ticket, 201);
    }


    public function show($id){
        return response()->json(Ticket::with('user')->findOrFail($id));
    }

    public function update(Request $request, $id){
        $ticket = Ticket::findOrFail($id);
        $ticket->update($request->all());
        return response()->json($ticket);
    }

    public function destroy($id){
        Ticket::destroy($id);
        return response()->json(null, 204);
    }

    public function assign(Request $request, $id){
        $ticket = Ticket::findOrFail($id);
        $ticket->assigned_to = $request->assigned_to;
        $ticket->save();
        return response()->json($ticket);
    }
}
