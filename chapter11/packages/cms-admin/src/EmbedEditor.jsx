import React from "react";
import { useQuery } from "react-query";

import Editor from "./Editor";
import { fetchPage } from "./api";

const PageAdmin = ({ page }) => {
  const { data } = useQuery(
    ["getPage", { page }],
    fetchPage("http://localhost:8080")
  );
  const [fields, setFields] = React.useState({});

  React.useEffect(() => {
    setFields(data);
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <Editor
      {...fields}
      page={page}
      host="http://localhost:8080"
      onChange={(k, v) => setFields({ ...fields, [k]: v })}
    />
  );
};

export default PageAdmin;
