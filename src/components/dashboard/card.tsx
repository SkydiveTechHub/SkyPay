import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface CardProps {
	children: React.ReactNode;
	title?: string;
	titleColor?: string;
}

const BasicCard: React.FC<CardProps> = ({ children, title, titleColor }) => {
	return (
		<Card
			sx={{
				minWidth: 50,
				backgroundColor: "#E6F9FF66",
				border: "0.42px solid rgba(0, 0, 0, 0.1)",
				borderRadius: "8px",
				boxShadow: "",
			}}
		>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color={`${titleColor}`} gutterBottom>
					{title}
				</Typography>
				{children}
			</CardContent>
		</Card>
	);
};

export default BasicCard;
