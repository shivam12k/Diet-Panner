import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const DayCard = ({ day, d }) => {
  console.log(day[0].MEAL);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {d}
        </Typography>
        <div>
          <Typography variant="h5" component="div">
            {day[0].MEAL}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Calories: {day[0].CALORIES}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dish: {day[0].DISH}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" component="div">
            {day[1].MEAL}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Calories: {day[1].CALORIES}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dish: {day[1].DISH}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" component="div">
            {day[2].MEAL}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Calories: {day[2].CALORIES}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Dish: {day[2].DISH}
          </Typography>
        </div>

      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
export default DayCard;
