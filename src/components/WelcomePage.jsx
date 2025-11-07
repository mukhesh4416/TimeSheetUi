import { Box, Card, CardContent, Typography, CardMedia,Button } from "@mui/material";
import timesheet from "../assets/timesheet.png"
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <Box
      sx={{
        paddingTop:5,
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Card sx={{ maxWidth: 1000, p: 3, textAlign: "center", borderRadius: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={timesheet}
          alt="Welcome Banner"
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Welcome 👋
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            This is your Timesheet dashboard.  
            Use the menu to view tasks, submit timesheets.
          </Typography>

         
        </CardContent>
      </Card>
    </Box>
  );
}
