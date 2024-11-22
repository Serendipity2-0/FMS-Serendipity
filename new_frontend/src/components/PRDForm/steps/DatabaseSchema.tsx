"use client";

/**
 * Database Schema design step component
 */
import React from 'react';
import { usePRD } from '@/context/PRDContext';
import { DatabaseTable, DatabaseField, DatabaseSchema as DBSchema } from '@/types/prd';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const FIELD_TYPES = [
  'string',
  'integer',
  'float',
  'boolean',
  'date',
  'datetime',
  'text',
  'json',
  'array',
  'uuid',
  'enum',
] as const;

const RELATIONSHIP_TYPES = [
  'one-to-one',
  'one-to-many',
  'many-to-many',
] as const;

type FieldType = typeof FIELD_TYPES[number];
type RelationshipType = typeof RELATIONSHIP_TYPES[number];

export default function DatabaseSchema() {
  const { state, dispatch } = usePRD();
  const { formData } = state;

  const schema = formData.database_schema || { tables: [] };

  const updateSchema = (newSchema: DBSchema) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        database_schema: newSchema,
      },
    });
  };

  const addTable = () => {
    const newTable: DatabaseTable = {
      name: '',
      fields: [{ name: '', type: 'string', required: true, description: '' }],
      relationships: [],
    };
    updateSchema({
      ...schema,
      tables: [...schema.tables, newTable],
    });
  };

  const removeTable = (tableIndex: number) => {
    const newTables = schema.tables.filter((_, index) => index !== tableIndex);
    updateSchema({ ...schema, tables: newTables });
  };

  const updateTable = (tableIndex: number, field: keyof DatabaseTable, value: string | DatabaseField[] | Array<{ table: string; type: RelationshipType }>) => {
    const newTables = [...schema.tables];
    newTables[tableIndex] = {
      ...newTables[tableIndex],
      [field]: value,
    };
    updateSchema({ ...schema, tables: newTables });
  };

  const addField = (tableIndex: number) => {
    const newTables = [...schema.tables];
    newTables[tableIndex].fields.push({
      name: '',
      type: 'string',
      required: true,
      description: '',
    });
    updateSchema({ ...schema, tables: newTables });
  };

  const removeField = (tableIndex: number, fieldIndex: number) => {
    const newTables = [...schema.tables];
    newTables[tableIndex].fields = newTables[tableIndex].fields.filter(
      (_, index) => index !== fieldIndex
    );
    updateSchema({ ...schema, tables: newTables });
  };

  const updateField = (
    tableIndex: number,
    fieldIndex: number,
    field: keyof DatabaseField,
    value: string | boolean
  ) => {
    const newTables = [...schema.tables];
    newTables[tableIndex].fields[fieldIndex] = {
      ...newTables[tableIndex].fields[fieldIndex],
      [field]: value,
    };
    updateSchema({ ...schema, tables: newTables });
  };

  const addRelationship = (tableIndex: number) => {
    const newTables = [...schema.tables];
    newTables[tableIndex].relationships.push({
      table: '',
      type: 'one-to-one',
    });
    updateSchema({ ...schema, tables: newTables });
  };

  const removeRelationship = (tableIndex: number, relationshipIndex: number) => {
    const newTables = [...schema.tables];
    newTables[tableIndex].relationships = newTables[tableIndex].relationships.filter(
      (_, index) => index !== relationshipIndex
    );
    updateSchema({ ...schema, tables: newTables });
  };

  const updateRelationship = (
    tableIndex: number,
    relationshipIndex: number,
    field: 'table' | 'type',
    value: string
  ) => {
    const newTables = [...schema.tables];
    newTables[tableIndex].relationships[relationshipIndex] = {
      ...newTables[tableIndex].relationships[relationshipIndex],
      [field]: value,
    };
    updateSchema({ ...schema, tables: newTables });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Database Schema</h2>
        <p className="text-gray-600 mb-6">
          Design your database schema by defining tables, fields, and relationships.
        </p>
      </div>

      <div className="space-y-8">
        {schema.tables.map((table, tableIndex) => (
          <div key={tableIndex} className="p-6 border border-gray-200 rounded-lg">
            {/* Table Name */}
            <div className="flex items-center justify-between mb-6">
              <input
                type="text"
                value={table.name}
                onChange={(e) => updateTable(tableIndex, 'name', e.target.value)}
                placeholder="Table Name"
                className="text-xl font-semibold px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => removeTable(tableIndex)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Fields */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">Fields</h4>
              <div className="space-y-3">
                {table.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-start space-x-4">
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => updateField(tableIndex, fieldIndex, 'name', e.target.value)}
                      placeholder="Field Name"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateField(tableIndex, fieldIndex, 'type', e.target.value)}
                      className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {FIELD_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(tableIndex, fieldIndex, 'required', e.target.checked)}
                        className="mr-2"
                      />
                      Required
                    </label>
                    <input
                      type="text"
                      value={field.description}
                      onChange={(e) => updateField(tableIndex, fieldIndex, 'description', e.target.value)}
                      placeholder="Description"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeField(tableIndex, fieldIndex)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addField(tableIndex)}
                className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add Field
              </button>
            </div>

            {/* Relationships */}
            <div>
              <h4 className="text-lg font-medium mb-4">Relationships</h4>
              <div className="space-y-3">
                {table.relationships.map((relationship, relationshipIndex) => (
                  <div key={relationshipIndex} className="flex items-center space-x-4">
                    <select
                      value={relationship.type}
                      onChange={(e) => updateRelationship(tableIndex, relationshipIndex, 'type', e.target.value)}
                      className="w-40 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {RELATIONSHIP_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <span className="text-gray-500">with</span>
                    <select
                      value={relationship.table}
                      onChange={(e) => updateRelationship(tableIndex, relationshipIndex, 'table', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Table</option>
                      {schema.tables
                        .filter((_, index) => index !== tableIndex)
                        .map((t, index) => (
                          <option key={index} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => removeRelationship(tableIndex, relationshipIndex)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addRelationship(tableIndex)}
                className="mt-4 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add Relationship
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addTable}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Table
      </button>

      {/* Validation Message */}
      {schema.tables.length === 0 && (
        <div className="mt-4 text-sm text-yellow-600">
          Add at least one table with fields to proceed
        </div>
      )}
    </div>
  );
}
