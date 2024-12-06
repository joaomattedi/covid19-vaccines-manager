<?php

namespace App\Http\Controllers;

use App\Models\Vaccine;
use Illuminate\Http\Request;

class VaccineController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $vaccines = Vaccine::paginate($perPage);
        
        return response()->json($vaccines);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'batch' => 'required|numeric',
            'expiration_date' => 'required|date',
        ]);
    
        $vaccine = Vaccine::create($validatedData);
    
        return response()->json($vaccine, 201);
    }

    public function show(string $id)
    {
        $vaccine = Vaccine::find($id);

        if (!$vaccine) {
            return response()->json(['message' => 'Vaccine not found'], 404);
        }

        return response()->json($vaccine);
    }

    public function update(Request $request, string $id)
    {
        $vaccine = Vaccine::find($id);

        if (!$vaccine) {
            return response()->json(['message' => 'Vaccine not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'batch' => 'required|numeric',
            'expiration_date' => 'required|date',
        ]);

        $vaccine->update($validatedData);

        return response()->json($vaccine);
    }

    public function destroy(string $id)
    {
        $vaccine = Vaccine::find($id);

        if (!$vaccine) {
            return response()->json(['message' => 'Vaccine not found'], 404);
        }

        $vaccine->delete();

        return response()->json(['message' => 'Vaccine deleted successfully']);
    }

    public function generateVaccines(Request $request)
    {
        $validated = $request->validate([
            'quantity' => 'nullable|integer|min:1',
        ]);

        $quantity = $validated['quantity'] ?? 1;

        Vaccine::factory($quantity)->create();

        return response()->json([
            'message' => "{$quantity} vaccine(s) generated with success!"
        ]);
    }
}
