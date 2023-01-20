import { Address } from "symbol-sdk/dist/src/model/account/Address";

interface SplitResult {
  name: string;
  id?: string;
}

export default function splitAccountName(accountName: string): SplitResult {
  let [name, id] = accountName.split("@");

  if (id && Address.isValidRawAddress(id)) {
    id = Address.createFromRawAddress(id).pretty();
  }

  return { name, id };
}
