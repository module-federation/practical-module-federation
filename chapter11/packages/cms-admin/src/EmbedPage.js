import React from "react";
import { useQuery } from "react-query";

import Page from "./Page";
import { fetchPage } from "./api";

const EmbedPage = ({ page }) => {
  const { data } = useQuery(
    ["getPage", { page }],
    fetchPage("http://localhost:8080")
  );
  return data ? <Page {...data} /> : null;
};

export default EmbedPage;
