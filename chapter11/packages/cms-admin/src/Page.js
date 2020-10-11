import React from "react";
import { Grid } from "semantic-ui-react";

const Page = ({ title, text, img1, img2, img3 }) => (
  <>
    <h1 style={{ borderBottom: "5px solid black" }}>{title}</h1>
    <p>{text}</p>
    <Grid columns={3}>
      <Grid.Row>
        {img1 && (
          <Grid.Column>
            <img src={img1} style={{ width: "100%" }} />
          </Grid.Column>
        )}
        {img2 && (
          <Grid.Column>
            <img src={img2} style={{ width: "100%" }} />
          </Grid.Column>
        )}
        {img3 && (
          <Grid.Column>
            <img src={img3} style={{ width: "100%" }} />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  </>
);

export default Page;
