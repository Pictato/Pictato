export interface Account {
  readonly accountId: string;
  readonly region: string;
  readonly stage: string;
  readonly airportCode: string;
}

export const Accounts: Account[] = [
  // account here
];

export const getAccountUniqueName = (account: Account): string =>
  getAccountUniqueNameWithDelimiter(account, "-");

export const getAccountUniqueNameWithDelimiter = (
  account: Account,
  delimiter: string
): string => `${account.stage}${delimiter}${account.airportCode}`;

export const getDevAccount = (userId: string): Account | undefined =>
  Accounts.find((account: Account) => account.stage === userId);
