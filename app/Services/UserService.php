<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getUsers($request)
    {
        $query = User::query();

        $sortBy = $request->input('sortBy','id');

        $sortOrder = $request->input('sortOrder', 'asc');

        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('rowsPerPage', 10);
        return $query->paginate($perPage);
    }
}