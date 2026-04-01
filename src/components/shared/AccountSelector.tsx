"use client";

import type { AccountId } from "@/data/types";
import { accounts } from "@/data/accounts";

interface AccountSelectorProps {
  selected: AccountId;
  onChange: (id: AccountId) => void;
}

const accountOrder: AccountId[] = ["robinhood", "intuit", "snap"];

export default function AccountSelector({ selected, onChange }: AccountSelectorProps) {
  return (
    <div className="flex gap-1 p-1 bg-surface-container rounded-lg">
      {accountOrder.map((id) => {
        const account = accounts[id];
        const isActive = selected === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-surface-container-lowest text-on-surface shadow-ghost"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            {account.name.split(/,?\s+(Inc|Markets)/)[0]}
            <span className="ml-1.5 text-xs text-outline">({account.ticker})</span>
          </button>
        );
      })}
    </div>
  );
}
