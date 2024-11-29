<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $query = $this->userService->getUsers($request);

        return Inertia::render("User/Index", [
            'users' => $query->items(),
            'current_page' => $query->currentPage(),
            'total_pages' => $query->lastPage(),
            'total_rows' => $query->total(),
            'per_page' => $query->perPage()
        ]);
    }

    public function destroy ( User $user)
    {
        $user->delete();
        return back()->with('success', 'User deleted successfully.');
    }
}
