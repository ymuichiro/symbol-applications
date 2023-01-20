import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next/types/index";
import Fadein from "../components/fadein";

interface Props {}

const Home: NextPage<Props> = () => {
  const router = useRouter();
  const [type, setType] = React.useState<"account" | "list">("account");
  const [id, setId] = React.useState<string>("");

  const onBlurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    setId(e.target.value.trim().replace("@", ""));
  };

  const onKeyDownEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.key === "Enter" && router.push(`/account/${id}`);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setId(e.currentTarget.value);
  };

  const onSelectChange = (e: SelectChangeEvent<"account" | "list">) => {
    setType(e.target.value as any);
  };

  const onClickButton = () => {
    router.push(`/account/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "grid",
          placeContent: "center",
          height: "70vh",
          gap: "2rem",
        }}
      >
        <div>
          <Fadein>
            <Typography variant="h4" component="h1" fontWeight="bold" align="center" gutterBottom>
              Profile
            </Typography>
            <Typography variant="h6" component="p" align="center" gutterBottom>
              Show your web3 profile!
            </Typography>
          </Fadein>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <FormControl>
            <InputLabel id="app-type-select-label">type</InputLabel>
            <Select
              labelId="app-type-select-label"
              id="app-type-select"
              value={type}
              size="small"
              label="type"
              onChange={onSelectChange}
            >
              <MenuItem value={"account"}>account</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            size="small"
            variant="outlined"
            label={"twitter username"}
            placeholder={"@username"}
            value={id}
            onChange={onChangeInput}
            onKeyDown={onKeyDownEnter}
            onBlur={onBlurInput}
          />
        </div>
        <div>
          <Button variant="contained" fullWidth onClick={onClickButton}>
            Submit
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {},
  };
};

export default Home;
