<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with('vaccine')->paginate(10);
        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cpf' => 'required|string|unique:employees,cpf|max:11',
            'full_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'date_first_dose' => 'nullable|date',
            'date_second_dose' => 'nullable|date',
            'date_third_dose' => 'nullable|date',
            'vaccine_id' => 'nullable|exists:vaccines,id',
            'comorbidity_carrier' => 'required|boolean',
        ]);

        $employee = Employee::create($validated);

        return response()->json($employee, 201); 
    }

    public function show(string $identifier)
    {
        if (preg_match('/^\d{11}$/', $identifier)) {
            $employee = Employee::where('cpf', $identifier)->firstOrFail();
        } elseif (is_numeric($identifier)) {
            $employee = Employee::find($identifier);
        } else {
            return response()->json(['message' => 'Use only ID or CPF to find employees'], 400);
        }
    
        if (!$employee) {
            return response()->json(['message' => "Employee not found $employee"], 404);
        }

        return response()->json($employee);
    }

    public function update(Request $request, string $identifier)
    {
        if (preg_match('/^\d{11}$/', $identifier)) {
            $employee = Employee::where('cpf', $identifier)->first();
        } elseif (is_numeric($identifier)) {
            $employee = Employee::find($identifier);
        } else {
            return response()->json(['message' => 'Invalid identifier provided'], 400);
        }

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        $validated = $request->validate([
            'cpf' => "required|string|unique:employees,cpf,{$employee->id}|max:11",
            'full_name' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'date_first_dose' => 'nullable|date',
            'date_second_dose' => 'nullable|date',
            'date_third_dose' => 'nullable|date',
            'vaccine_id' => 'nullable|exists:vaccines,id',
            'comorbidity_carrier' => 'required|boolean',
        ]);

        $employee->update($validated);

        return response()->json($employee);
    }

    public function destroy(string $identifier)
    {
        if (preg_match('/^\d{11}$/', $identifier)) {
            $employee = Employee::where('cpf', $identifier)->first();
        } elseif (is_numeric($identifier)) {
            $employee = Employee::find($identifier);
        } else {
            return response()->json(['message' => 'Invalid identifier provided'], 400);
        }

    // Se não encontrar o funcionário
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
