import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import { useCookies } from "react-cookie"
import { fetchCreditData, fetchCreditTransactions } from "../API/creditApiCallls";

export const useFetchCreditTransactions = (user_id) => {
    const [cookies] = useCookies("blind_weight");
    const token = cookies.blind_weight !== "undefined" ? cookies.blind_weight : null;
    const decoded = jwtDecode(token);
    const userID = user_id ? user_id : decoded ? decoded.id : null;

    const { data, isLoading, error, refetch } = useQuery('credit_trans', () => fetchCreditTransactions(userID));

    useEffect(() => {
        // Call the refetch function when userId changes
        refetch();
    }, [user_id, userID, refetch]);

  return { data, isLoading, error, refetch };
}

export const useFetchCreditDetails = (user_id) => {
    const [cookies] = useCookies("blind_weight");
    const token = cookies.blind_weight !== "undefined" ? cookies.blind_weight : null;
    const decoded = jwtDecode(token);
    const userID = user_id ? user_id : decoded ? decoded.id : null;

    const { data, isLoading, error, refetch } = useQuery('data', () => fetchCreditData(userID));

    useEffect(() => {
        // Call the refetch function when userId changes
        refetch();
    }, [user_id, userID, refetch]);

  return { data, isLoading, error, refetch };
}
