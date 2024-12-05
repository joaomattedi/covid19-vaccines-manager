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

    public function show(string $id)
    {
        $employee = Employee::with('vaccine')->findOrFail($id);
        return response()->json($employee);
    }

    public function update(Request $request, string $id)
    {
        $employee = Employee::findOrFail($id);

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

    public function destroy(string $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted successfully'], 200);
    }
}
