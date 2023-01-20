import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { GetServerSideProps, NextPage } from "next/types/index";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import splitAccountName from "@/utils/splitAccountName";
import { Data } from "@/pages/api/get/[username]";
import { MdOpenInNew, MdPersonPin, MdOutlineAccountBalance } from "react-icons/md";
import Grid from "@mui/material/Grid";

const Account: NextPage<Data> = (props) => {
  const [snackText, setSnackText] = React.useState<string>("");
  const { name, id } = splitAccountName(props.name);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.replaceAll("-", "")).then(() => {
      setSnackText("Copied!");
    });
  };

  return (
    <Container maxWidth="sm">
      <Snackbar open={snackText !== ""} autoHideDuration={2000} onClose={() => setSnackText("")} message={snackText} />
      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Card style={{ width: "100%" }}>
          <CardHeader
            avatar={<Avatar aria-label="account-icon" src={props.icon} sx={{ width: 56, height: 56 }} />}
            action={<IconButton aria-label="settings"></IconButton>}
            title={name}
            subheader={props.username}
            titleTypographyProps={{
              variant: "h6",
              component: "h1",
              fontWeight: "bold",
            }}
          />
          <CardContent>
            <Typography fontWeight={"bold"}>Info</Typography>
            <Grid container>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">{`Followers ${props.followers}`}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">{`Following ${props.following}`}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">{`Tweets ${props.tweetCount}`}</Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">{`Created ${new Date(props.created).toLocaleDateString()}`}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <Typography fontWeight={"bold"}>Description</Typography>
            <Typography gutterBottom style={{ whiteSpace: "pre-wrap" }}>
              {props.description}
            </Typography>
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "stretch",
              gap: "1rem",
            }}
          >
            {id && (
              <Button
                variant="contained"
                fullWidth
                style={{ backgroundColor: "white", minHeight: "5rem" }}
                onClick={() => copyToClipboard(id)}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <Typography align="left" color="textPrimary" fontWeight="bold">
                      Address
                    </Typography>
                    <Typography align="left" color="textPrimary">
                      {splitAccountName(props.name).id}
                    </Typography>
                  </div>
                  <div>
                    <MdOutlineAccountBalance color="gray" size="30px" />
                  </div>
                </div>
              </Button>
            )}
            {props.url && (
              <Button
                variant="contained"
                fullWidth
                style={{ backgroundColor: "white", minHeight: "5rem" }}
                LinkComponent="a"
                target={"_blank"}
                rel={"noopener noreferrer"}
                href={props.url}
              >
                <div style={{ width: "100%", display: "flex" }}>
                  <Typography align="left" color="textPrimary" fontWeight="bold" style={{ flexGrow: 1 }}>
                    Go to site
                  </Typography>
                  <MdOpenInNew color="gray" size="30px" />
                </div>
              </Button>
            )}
            <Button
              variant="contained"
              fullWidth
              style={{ backgroundColor: "white", minHeight: "5rem" }}
              LinkComponent="a"
              target={"_blank"}
              rel={"noopener noreferrer"}
              href={`https://twitter.com/${props.username}`}
            >
              <div style={{ width: "100%", display: "flex" }}>
                <Typography align="left" color="textPrimary" fontWeight="bold" style={{ flexGrow: 1 }}>
                  Go to twitter
                </Typography>
                <MdPersonPin color="gray" size="30px" />
              </div>
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async ({ query, req }) => {
  const id = query.id as string;
  const host = req.headers.host as string;
  const res = await fetch(`http://${host}/api/get/${id}`);
  const props = (await res.json()) as Data;
  return { props };
};

export default Account;
