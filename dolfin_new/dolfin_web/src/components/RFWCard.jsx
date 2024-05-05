import React from "react";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';
const RFWCard = () => {
    const [score,setScore]=React.useState("unKnown");
    const [selectedValues, setSelectedValues] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleCheckboxChange = (questionIndex, value) => {
        setSelectedValues({ ...selectedValues, [questionIndex]: value });
      };
      const handleSubmit = () => {
        let allRowsSelected = true;
        for (let i = 0; i < questions.length; i++) {
          if (selectedValues[i] === undefined) {
            alert(`Please select at least one option for question ${i + 1}`);
            allRowsSelected = false;
            break;
          }
        }
        if (allRowsSelected) {
          calculateSum();
        }
      };
    
      const calculateSum = () => {
        let sum = Object.values(selectedValues).reduce((acc, value) => acc + value, 0);
        sum = sum * 2.5;
        setScore(sum);
        setOpen(false);
      };

      const questions = [
        'I can enjoy life because of the way I’m managing my money',
        'I could handle a major unexpected expense',
        'I am securing my financial future',
        'I feel on top of my day to day finances',
        'I am comfortable with my current levels of spending relative to the funds I have coming in',
        'I am on track to have enough money to provide for my financial needs in the future',
        'Giving a gift for a wedding, birthday or other occasion would put a strain on my finances for the month',
        'My finances control my life',
        'I have money left over at the end of the month',
        'How often do the following statements apply to you?',
      ];
  return (<>
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        action={
          <IconButton aria-label="help">
            <HelpOutlineIcon />
          </IconButton>
        }
        title={
            <Typography color="#2196f3" sx={{fontWeight: "bold",fontSize: 24, fontStyle: "italic"}} >
              Reported Financial Well-being Score
            </Typography>
          }
      />
      <CardContent>
        <Typography
          sx={{
            fontSize: 100,
            fontWeight: "bold",
            textAlign: "center",
          }}
          gutterBottom
        >
          {score}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>Start Survey</Button>
      </CardActions>
    </Card>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
        <DialogTitle id="form-dialog-title">Financial Wellbeing Survey</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell align="center">Completely</TableCell>
                <TableCell align="center">Very Well</TableCell>
                <TableCell align="center">Somewhat</TableCell>
                <TableCell align="center">Very Little</TableCell>
                <TableCell align="center">Not at All</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question, index) => (
                <TableRow key={index}>
                  <TableCell>{question}</TableCell>
                  {[4, 3, 2, 1, 0].map(value => (
                    <TableCell key={value} align="center">
                      <Checkbox
                        checked={selectedValues[index] === value}
                        onChange={() => handleCheckboxChange(index, value)}
                        value={value}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit Survey
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default RFWCard;
