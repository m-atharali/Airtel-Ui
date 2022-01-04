import React from "react";
import useSWR from "swr";

const SWRData = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://facial-airtel.herokuapp.com/api/facial-recognition/count",
    fetcher
  );
  console.log(data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div>Total Hits = {data.count}</div>
    </>
  );
};

export default SWRData;
