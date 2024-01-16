<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            "msg" => "berhasil",
            "tasks" => $tasks
        ]);
    }

    public function show($id)
    {
        $task = Task::find($id);
        return response()->json($task);
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            // 'index' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $index = Task::where('category', $validateData["category"])->max('index');
        $index = $index !== null ? $index + 1 : 0;

        $task = [
            'title' => $validateData['title'],
            'description' => $validateData['description'],
            'category' => $validateData['category'],
            'index' => $index,
            'user_id' => $validateData["user_id"]
        ];

        $task = Task::create($task);

        return response()->json([$task], 201);
    }
}
