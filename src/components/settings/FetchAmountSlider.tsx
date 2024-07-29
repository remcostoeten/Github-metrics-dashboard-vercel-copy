import React, { useState, useEffect } from 'react';
import { useGitHubStore } from '@/core/store/useGithubStore';

export function FetchAmountSlider() {
  const { fetchAmount, setFetchAmount } = useGitHubStore();
  const [inputValue, setInputValue] = useState(fetchAmount);

  useEffect(() => {
    setInputValue(fetchAmount);
  }, [fetchAmount]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted with value:', inputValue);
    setFetchAmount(inputValue);
  };

  return (
    <div className="w-full max-w-sm fixed top-32 right-4 bg-white text-black p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fetch-amount" className="block text-sm font-medium text-gray-700">
          Number of activities to fetch
        </label>
        <input
          id="fetch-amount"
          type="number"
          min={1}
          max={30}
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
      <span className="mt-2 block text-sm text-gray-500">Current value: {fetchAmount}</span>
    </div>
  );
}