import React from "react";
import { Input, TextArea, Form, Button } from "semantic-ui-react";
import { useMutation } from "react-query";

import { postPage } from "./api";

const Editor = ({
  title,
  text,
  img1,
  img2,
  img3,
  page,
  onChange,
  host = "",
}) => {
  const [mutate] = useMutation(postPage(host));

  const onSave = () => {
    mutate({
      page,
      title,
      text,
      img1,
      img2,
      img3,
    });
  };

  return (
    <Form>
      <Input
        placeholder="Title"
        value={title}
        onChange={(evt) => onChange("title", evt.target.value)}
        style={{ width: "100%" }}
      />
      <TextArea
        placeholder="Text"
        value={text}
        onChange={(evt) => onChange("text", evt.target.value)}
        style={{
          marginTop: "1em",
        }}
      />
      <Input
        placeholder="Image 1"
        value={img1}
        onChange={(evt) => onChange("img1", evt.target.value)}
        style={{
          marginTop: "1em",
          width: "100%",
        }}
      />
      <Input
        placeholder="Image 2"
        value={img2}
        onChange={(evt) => onChange("img2", evt.target.value)}
        style={{
          marginTop: "1em",
          width: "100%",
        }}
      />
      <Input
        placeholder="Image 3"
        value={img3}
        onChange={(evt) => onChange("img3", evt.target.value)}
        style={{
          marginTop: "1em",
          width: "100%",
        }}
      />
      <Button
        type="primary"
        onClick={onSave}
        style={{
          marginTop: "1em",
        }}
        primary
      >
        Save
      </Button>
    </Form>
  );
};

export default Editor;
