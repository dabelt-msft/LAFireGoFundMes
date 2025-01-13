"use client";

import React, { useState } from "react";
import type { NextPage } from "next";
import initialData from "../data/gofundme-data.json";

interface Campaign {
  title: string;
  url: string;
  amount_raised: number;
  goal: number;
  difference_from_goal: number;
}

const Home: NextPage = () => {
  // State for campaigns
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialData);

  // Sorting function
  const sortCampaigns = (property: keyof Campaign, ascending: boolean) => {
    const sorted = [...campaigns].sort((a, b) => {
      if (a[property] < b[property]) return ascending ? -1 : 1;
      if (a[property] > b[property]) return ascending ? 1 : -1;
      return 0;
    });
    setCampaigns(sorted);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Main content, add bottom padding so footer doesn't overlap content */}
      <main className="max-w-3xl mx-auto p-6 pb-24">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">
            GoFundMe Campaigns
          </h1>
          {/* Sorting buttons */}
          <div className="flex flex-col md:flex-row gap-2 mb-6 justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => sortCampaigns("amount_raised", true)}
            >
              Sort by Raised (Asc)
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => sortCampaigns("amount_raised", false)}
            >
              Sort by Raised (Desc)
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => sortCampaigns("difference_from_goal", true)}
            >
              Sort by Difference (Asc)
            </button>
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

      {/* Floating footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-3 px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left side: your name, tagline, or branding */}
          <div className="font-semibold text-base">
            Web dev help needed! Contact David Beltran via instagram
          </div>

          {/* Right side: contact links, social links, etc. */}
          <div className="flex items-center gap-4 text-sm">
            {/* <a href="mailto:your.email@example.com" className="hover:underline">
              Email
            </a> */}
            <a
              href="https://www.instagram.com/david_beltran_photography"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://github.com/LAFireGoFundMes"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
