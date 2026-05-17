import fs from 'fs';
import path from 'path';
import type { Account } from '../types';

const ACCOUNTS_PATH = path.join(process.cwd(), 'data', 'accounts.json');

export function getAccounts(): Account[] {
  if (!fs.existsSync(ACCOUNTS_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(ACCOUNTS_PATH, 'utf-8')) as Account[];
  } catch {
    return [];
  }
}

export function saveAccounts(accounts: Account[]): void {
  fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify(accounts, null, 2), 'utf-8');
}

export function addAccount(account: Account): void {
  const accounts = getAccounts();
  if (accounts.find((a) => a.id === account.id)) {
    throw new Error(`Account with id "${account.id}" already exists`);
  }
  accounts.push(account);
  saveAccounts(accounts);
}

export function removeAccount(id: string): boolean {
  const accounts = getAccounts();
  const filtered = accounts.filter((a) => a.id !== id);
  if (filtered.length === accounts.length) return false;
  saveAccounts(filtered);
  return true;
}

export function getAccount(id: string): Account | undefined {
  return getAccounts().find((a) => a.id === id);
}
