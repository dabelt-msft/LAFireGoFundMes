"use client";

// pages/index.tsx
import React, { useState } from "react";
import type { NextPage } from "next";
// If you have an external JSON file, uncomment the line below
// import gofundmeData from '../data/gofundmeData.json';

interface Campaign {
  title: string;
  url: string;
  amount_raised: number;
  goal: number;
  difference_from_goal: number;
}

const Home: NextPage = () => {
  // For demo, let's inline the data here:
  const initialData: Campaign[] = [
    {
      title: "Campaign A",
      url: "https://www.gofundme.com/campaignA",
      amount_raised: 100,
      goal: 1000,
      difference_from_goal: 900,
    },
    {
      title: "Campaign B",
      url: "https://www.gofundme.com/campaignB",
      amount_raised: 250,
      goal: 500,
      difference_from_goal: 250,
    },
    {
      title: "Campaign C",
      url: "https://www.gofundme.com/campaignC",
      amount_raised: 3000,
      goal: 5000,
      difference_from_goal: 2000,
    },
  ];

  // If using external JSON, you might do:
  // const initialData: Campaign[] = gofundmeData;

  // Keep campaigns in state
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialData);

  // Sort campaigns by a particular property and direction
  const sortCampaigns = (property: keyof Campaign, ascending: boolean) => {
    const sorted = [...campaigns].sort((a, b) => {
      if (a[property] < b[property]) return ascending ? -1 : 1;
      if (a[property] > b[property]) return ascending ? 1 : -1;
      return 0;
    });
    setCampaigns(sorted);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          GoFundMe Campaigns
        </h1>

        {/* Buttons for sorting */}
        <div className="flex flex-col md:flex-row gap-2 mb-6 justify-center">
          {/* Sort by amount_raised ascending */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => sortCampaigns("amount_raised", true)}
          >
            Sort by Raised (Asc)
          </button>

          {/* Sort by amount_raised descending */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => sortCampaigns("amount_raised", false)}
          >
            Sort by Raised (Desc)
          </button>

          {/* Sort by difference_from_goal ascending */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={() => sortCampaigns("difference_from_goal", true)}
          >
            Sort by Difference (Asc)
          </button>

          {/* Sort by difference_from_goal descending */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={() => sortCampaigns("difference_from_goal", false)}
          >
            Sort by Difference (Desc)
          </button>
        </div>

        {/* Campaigns list */}
        <ul className="space-y-4">
          {campaigns.map((campaign, index) => (
            <li key={index} className="p-4 border rounded shadow-sm">
              <h2 className="text-xl font-semibold mb-1">{campaign.title}</h2>
              <p className="mb-1">
                <strong>Raised:</strong> $
                {campaign.amount_raised.toLocaleString()}{" "}
                <span className="text-gray-500">
                  (Goal: ${campaign.goal.toLocaleString()})
                </span>
              </p>
              <p className="mb-2">
                <strong>Difference from Goal:</strong>{" "}
                {campaign.difference_from_goal.toLocaleString()}
              </p>
              <a
                href={campaign.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Campaign
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
