<?php
namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // list all ticket
    public function index(){
        $getTickets = Ticket::with('user')->get();

        return response()->json([
            "msg" => "success get all tickets",
            "getTickets" => $getTickets
        ]);
    }

    // create ticket and put in db
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


    // show specific ticket in db
    public function show($id){

        $showAll = Ticket::with('user')->findOrFail($id);

        return response()->json([
            "msg" => "success to show",
            "showAll" => $showAll
    ]);
    }

    // update ticket
    public function update(Request $request, $id){

        $ticket = Ticket::findOrFail($id);
        $ticket->update($request->all());

        return response()->json([
            "msg" => "success update",
            "update" => $ticket
        ]);
    }

    // deleete ticket
    public function destroy($id){

        $destroyTicket = Ticket::destroy(ids: $id);

        return response()->json(
            [null,
            "msg" => "destroy successful {{$id}}"
            ]);
    }

    // assign ticket
    public function assign(Request $request, $id){
        $ticket = Ticket::findOrFail($id);
        $ticket->assigned_to = $request->assigned_to;
        $assigningTicket = $ticket->save();
        return response()->json([
            "msg" => "success asssigning a ticket",
            "assingingTicket" => $assigningTicket
        ]);
    }
}
