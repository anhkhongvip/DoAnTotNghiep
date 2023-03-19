import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getAccountAsync } from "../services/account.service";

export default function useAuth(token: string) {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      if (token === "") {
        setAccount(null);
      } else {
        let res = await dispatch(getAccountAsync(token));
        let { account } = res.payload.data;
        setAccount(account);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return [account, setAccount];
}
