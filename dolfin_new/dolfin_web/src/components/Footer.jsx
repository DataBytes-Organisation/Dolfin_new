import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select"; 
import MenuItem from "@mui/material/MenuItem"; 
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram"; 
import FormControl from "@mui/material/FormControl"; 

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {"© "}
      Dolfin Website {new Date().getFullYear()}
    </Typography>
  );
}

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "zh-CN",
    name: "中文",
  },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#2196f3", color: "white" }}>
      <Container sx={{ py: 8, display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="flex-start" alignItems="center" mb={2}>
              <FacebookIcon fontSize="large" sx={{ mr: 1 }} />
              <InstagramIcon fontSize="large" />
            </Box>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Copyright />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="/" color="inherit">Terms</Link>
              </li>
              <li>
                <Link href="/" color="inherit">Privacy</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Language
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                defaultValue={LANGUAGES[0].code}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ color: "white", borderColor: "white" }}
              >
                {LANGUAGES.map((language) => (
                  <MenuItem value={language.code} key={language.code}>
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
