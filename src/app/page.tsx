"use client";

import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import initialData from "../data/gofundme-data.json";
import Link from "next/link";

interface Campaign {
  title: string;
  url: string;
  amount_raised: number;
  goal: number;
  difference_from_goal: number;
}

type SortHeader = "Amount Raised" | "Difference from Goal";
type SortDirection = "Asc" | "Desc";
type SortDirectionText = "Ascending" | "Descending";

const Home: NextPage = () => {
  // State for campaigns

  const sortCampaigns = (
    camps: Campaign[],
    property: keyof Campaign,
    ascending: boolean
  ) => {
    const sorted = [...camps].sort((a, b) => {
      if (a[property] < b[property]) return ascending ? -1 : 1;
      if (a[property] > b[property]) return ascending ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const campaignsWithoutGoalsMet = initialData.filter((item) => {
    return item.amount_raised < item.goal;
  });

  const initialSortedCampaigns = sortCampaigns(
    campaignsWithoutGoalsMet,
    "amount_raised",
    true
  );

  const [campaigns, setCampaigns] = useState<Campaign[]>(
    initialSortedCampaigns
  );
  const [raisedDirectionText, setRaisedDirectionText] =
    useState<SortDirection>("Desc");

  const [differenceDirectionText, setDifferenceDirectionText] =
    useState<SortDirection>("Asc");

  const [sortHeader, setSortHeader] = useState<SortHeader>("Amount Raised");
  const [currentSortDirectionText, setCurrentSortDirectionText] =
    useState<SortDirectionText>("Ascending");

  const [sortDirectionBoolean, setSortDirectionBoolean] =
    useState<boolean>(true);

  const getDirectionFullText = (newDirection: boolean) => {
    const value = newDirection ?? false;
    setSortDirectionBoolean(value);
    return newDirection ? "Ascending" : "Descending";
  };

  const getAbbreviatedDirection = (newDirection: boolean) => {
    return newDirection ? "Desc" : "Asc";
  };

  const getDirectionFromText = (isRaisedAmount: boolean) => {
    if (isRaisedAmount) {
      return raisedDirectionText === "Asc";
    }
    return differenceDirectionText === "Asc";
  };

  const [showFullyFunded, setShowFullyFunded] = useState<boolean>(false);
  const [showFullyFundedText, setShowFullyFundedText] =
    useState<string>("Show");

  const [sort_argument, setSortArgument] =
    useState<keyof Campaign>("amount_raised");

  const onShowFullyFundedCampaignsClicked = () => {
    if (showFullyFunded) {
      setShowFullyFundedText("Show");
      setCampaigns(campaignsWithoutGoalsMet);
      setShowFullyFunded(false);
      setCampaigns(
        sortCampaigns(
          campaignsWithoutGoalsMet,
          sort_argument,
          sortDirectionBoolean
        )
      );
    } else {
      setShowFullyFundedText("Hide");
      setCampaigns(campaigns);
      setShowFullyFunded(true);
      setCampaigns(
        sortCampaigns(initialData, sort_argument, sortDirectionBoolean)
      );
    }
  };

  const onRaisedClicked = () => {
    const newRaisedDirection = getDirectionFromText(true);
    setRaisedDirectionText(getAbbreviatedDirection(newRaisedDirection));
    setSortArgument("amount_raised");
    setCampaigns(sortCampaigns(campaigns, "amount_raised", newRaisedDirection));
    setSortHeader("Amount Raised");
    setCurrentSortDirectionText(getDirectionFullText(newRaisedDirection));
  };

  const onDifferenceClicked = () => {
    const newDifferenceDirection = getDirectionFromText(false);
    setDifferenceDirectionText(getAbbreviatedDirection(newDifferenceDirection));
    setSortArgument("difference_from_goal");
    setCampaigns(
      sortCampaigns(campaigns, "difference_from_goal", newDifferenceDirection)
    );
    setSortHeader("Difference from Goal");
    setCurrentSortDirectionText(getDirectionFullText(newDifferenceDirection));
  };

  const lastUpdated = useRef(new Date("2025-01-17T00:23:41Z").toLocaleString());

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Main content, add bottom padding so footer doesn't overlap content */}
      <main className="max-w-3xl mx-auto p-6 pb-24">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Los Angeles Eaton Fire Go Fund Me Campaigns
          </h1>
          <p className="text-gray-600 text-center mb-6">
            This site provides a list of GoFundMe campaigns obtained from the
            Eaten Fire Linktree page, sorted and organized so you can easily see
            how far each campaign is from its goal and which campaigns need the
            most help.
          </p>
          <div className="text-center mb-6">
            <p className="text-gray-600">
              If you don&apos;t see your campaign below, please make sure it is
              added to the Linktree page here:{" "}
            </p>
            <button className="text-center mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="https://linktr.ee/eatonfire?utm_source=linktree_profile_share&ltsid=1652c953-a469-4d55-931c-25ebd67231ee&fbclid=PAZXh0bgNhZW0CMTEAAaa7BAJRJtS6fb35--dQ1kclRbliWmUxczd_La-1HtOscRxMqOxm4B_G24o_aem_ht5RCsLH3IwSQrZJmI7UZQ">
                LinkTree Page
              </Link>
            </button>
          </div>

          {/* Sorting buttons */}
          <div className="flex flex-col md:flex-row gap-2 mb-6 justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={onRaisedClicked}
            >
              Sort by Amount Raised ({raisedDirectionText})
            </button>
            {/* <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={() => sortCampaigns("amount_raised", ra)}
            >
              Sort by Raised (Desc)
            </button> */}
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={onDifferenceClicked}
            >
              Sort by Difference to Goal ({differenceDirectionText})
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
              onClick={onShowFullyFundedCampaignsClicked}
            >
              {showFullyFundedText} Fully Funded Campaigns
            </button>
            {/* <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => sortCampaigns("difference_from_goal", false)}
            >
              Sort by Difference (Desc)
            </button> */}
          </div>
          {/* Campaigns list */}
          <h1>
            Sorted by:{" "}
            <strong>
              {sortHeader} - {currentSortDirectionText}
            </strong>
          </h1>
          <ul className="space-y-4">
            {campaigns.map((campaign, index) => (
              <li key={index} className="p-4 border rounded shadow-sm">
                <h2 className="text-xl font-semibold mb-1">{campaign.title}</h2>
                <p className="mb-1">
                  <strong>Amount Raised:</strong> $
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
          <div> Last Updated: {lastUpdated.current}</div>
          {/* Left side: your name, tagline, or branding */}
          <div className="font-semibold text-base">
            See contact info for questions
          </div>

          {/* Right side: contact links, social links, etc. */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="mailto:david@lafiregofundmes.org"
              className="hover:underline"
            >
              Email
            </a>
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
