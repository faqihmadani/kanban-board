<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $tasks = Task::all()->where('user_id', $user['id']);
        return response()->json([
            "tasks" => $tasks
        ]);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();

        $task = Task::where('id', $id)->where('user_id', $user['id'])->first();

        if ($task) {
            return response()->json([
                "data" => $task
            ]);
        } else {
            return response()->json([
                "message" => "Task not found",
            ], 404);
        }
    }

    public function create(Request $request)
    {
        $validateData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            // 'user_id' => 'required|integer',
        ]);

        $index = Task::where('category', $validateData["category"])->where('user_id', $request->user()['id'])->max('index');
        $index = $index !== null ? $index + 1 : 0;

        $task = [
            'title' => $validateData['title'],
            'description' => $validateData['description'],
            'category' => $validateData['category'],
            'index' => $index,
            'user_id' => $request->user()['id'],
        ];

        $task = Task::create($task);

        return response()->json([
            'message' => 'Task has been created',
            'data' => $task
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validateData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'index' => 'required|integer',
        ]);

        $user = $request->user();

        $task = [
            'title' => $validateData['title'],
            'description' => $validateData['description'],
            'category' => $validateData['category'],
            'index' => $validateData['index'],
            'user_id' => $user['id']
        ];

        $oldTask = Task::where('id', $id)->where('user_id', $user['id'])->first();
        if ($oldTask) {
            $oldTask->update($task);
            return response()->json([
                "message" => "Task has beeen updated",
                "data" => $task
            ]);
        } else {
            return response()->json([
                "message" => "Task not found",
            ], 404);
        }
    }

    public function delete(Request $request, $id)
    {
        $user = $request->user();

        $task = Task::where('id', $id)->where('user_id', $user['id'])->first();

        if ($task) {
            $task->delete();
            return response()->json([
                "message" => "Task has beeen deleted",
            ]);
        } else {
            return response()->json([
                "message" => "Task not found",
            ], 404);
        }
    }
}
