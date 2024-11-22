"use client";

/**
 * Reference Links step component
 */
import React from 'react';
import { usePRD } from '@/context/PRDContext';
import { ReferenceLink } from '@/types/prd';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ReferenceLinks() {
  const { state, dispatch } = usePRD();
  const { formData } = state;

  const referenceLinks = formData.reference_links || [];

  const addReferenceLink = () => {
    const newLinks = [
      ...referenceLinks,
      { link: '', features: [''] }
    ];
    
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        reference_links: newLinks,
      },
    });
  };

  const removeReferenceLink = (index: number) => {
    const newLinks = referenceLinks.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        reference_links: newLinks,
      },
    });
  };

  const updateLink = (index: number, field: keyof ReferenceLink, value: string | string[]) => {
    const newLinks = [...referenceLinks];
    newLinks[index] = {
      ...newLinks[index],
      [field]: value,
    };

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        reference_links: newLinks,
      },
    });
  };

  const addFeature = (linkIndex: number) => {
    const newLinks = [...referenceLinks];
    newLinks[linkIndex].features.push('');
    
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        reference_links: newLinks,
      },
    });
  };

  const removeFeature = (linkIndex: number, featureIndex: number) => {
    const newLinks = [...referenceLinks];
    newLinks[linkIndex].features = newLinks[linkIndex].features.filter(
      (_, i) => i !== featureIndex
    );

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        reference_links: newLinks,
      },
    });
  };

  const updateFeature = (linkIndex: number, featureIndex: number, value: string) => {
    const newLinks = [...referenceLinks];
    newLinks[linkIndex].features[featureIndex] = value;

    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: {
        ...formData,
        reference_links: newLinks,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Reference Links</h2>
        <p className="text-gray-600 mb-6">
          Add reference links and their key features that inspire your project.
        </p>
      </div>

      <div className="space-y-6">
        {referenceLinks.map((link, linkIndex) => (
          <div key={linkIndex} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-grow mr-4">
                <label 
                  htmlFor={`link-${linkIndex}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reference Link
                </label>
                <input
                  type="url"
                  id={`link-${linkIndex}`}
                  value={link.link}
                  onChange={(e) => updateLink(linkIndex, 'link', e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => removeReferenceLink(linkIndex)}
                className="p-2 text-red-600 hover:text-red-800"
                title="Remove reference link"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Features
              </label>
              {link.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(linkIndex, featureIndex, e.target.value)}
                    placeholder="Enter a feature"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeFeature(linkIndex, featureIndex)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                    title="Remove feature"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addFeature(linkIndex)}
                className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Feature
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addReferenceLink}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add Reference Link
      </button>

      {/* Validation Message */}
      {referenceLinks.length === 0 && (
        <div className="mt-4 text-sm text-yellow-600">
          Add at least one reference link with features to proceed
        </div>
      )}
    </div>
  );
}
