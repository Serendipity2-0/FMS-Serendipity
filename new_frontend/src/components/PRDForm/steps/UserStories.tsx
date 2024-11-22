"use client";

/**
 * User Stories step component
 */
import React from 'react';
import { usePRD } from '@/context/PRDContext';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function UserStories() {
  const { state, dispatch } = usePRD();
  const { formData } = state;

  const userStories = formData.user_stories || [];

  const addUserStory = () => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        user_stories: [...userStories, ''],
      },
    });
  };

  const removeUserStory = (index: number) => {
    const newStories = userStories.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        user_stories: newStories,
      },
    });
  };

  const updateUserStory = (index: number, value: string) => {
    const newStories = [...userStories];
    newStories[index] = value;
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        user_stories: newStories,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">User Stories</h2>
        <p className="text-gray-600 mb-6">
          Define user stories to describe the functionality from an end-user&apos;s perspective.
          Format: &quot;As a [type of user], I want [goal] so that [benefit]&quot;
        </p>
      </div>

      <div className="space-y-4">
        {userStories.map((story, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-grow">
              <label
                htmlFor={`story-${index}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                User Story {index + 1}
              </label>
              <textarea
                id={`story-${index}`}
                value={story}
                onChange={(e) => updateUserStory(index, e.target.value)}
                placeholder="As a [type of user], I want [goal] so that [benefit]"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => removeUserStory(index)}
              className="mt-6 p-2 text-red-600 hover:text-red-800"
              title="Remove user story"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}

        <button
          onClick={addUserStory}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add User Story
        </button>
      </div>

      {/* Example Section */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-3">Example User Stories:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            As a new user, I want to create an account so that I can save my preferences
          </li>
          <li>
            As a registered user, I want to reset my password so that I can regain access if I forget it
          </li>
          <li>
            As an admin, I want to view user analytics so that I can track platform usage
          </li>
        </ul>
      </div>

      {/* Validation Message */}
      {userStories.length === 0 && (
        <div className="mt-4 text-sm text-yellow-600">
          Add at least one user story to proceed
        </div>
      )}
    </div>
  );
}
