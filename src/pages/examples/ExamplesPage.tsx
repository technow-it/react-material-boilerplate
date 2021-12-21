import { Typography, Grid, Box, Button } from "@mui/material";
import FlexBox from "../../components/layout/FlexBox";
import Images from "../../assets/img/Images";
import Footer from "../../components/Footer";
import CardItem from "../../components/CardItem";

import MultiDialogExample from "./MultiDialogExample";
import DialogManager from "../../components/dialogs/DialogManager";
import { useState } from "react";

export default function ExamplesPage() {
  // IF YOU NEED ONLY A MODAL IN THE PAGE
  const [modalOpen, set_modalOpen] = useState(false);

  const Menu = () => (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: 50 }}>
      <Grid
        container
        spacing={{ xs: 6, sm: 6, md: 3 }}
        columnGap={{ md: 6 }}
        columns={{ xs: 8, sm: 8, md: 12 }}
        justifyContent="center"
      >
        <Grid item xs={7} sm={6} md={3}>
          <Button
            variant="contained"
            className="m12 flex"
            onClick={() => set_modalOpen(true)}
          >
            Open Modal
          </Button>
          <DialogManager
            type="confirm"
            open={modalOpen}
            handleClose={() => set_modalOpen(false)}
          />
          <MultiDialogExample />
        </Grid>
        <Grid item xs={7} sm={6} md={3}>
          <CardItem image={Images.image2} text={"ART"} />
        </Grid>
        <Grid item xs={7} sm={6} md={3}>
          <CardItem image={Images.image3} text={"STORE MODA"} />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div style={{ marginTop: 40 }}>
      <FlexBox direction="column">
        <Typography variant="h2" component="h2">
          EXAMPLES
        </Typography>
      </FlexBox>
      <Menu />
      <Footer />
    </div>
  );
}