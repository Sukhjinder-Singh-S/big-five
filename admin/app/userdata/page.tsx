"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Typography,
} from "@mui/material";

interface Facet {
  facet: number;
  title: string;
  score: number;
  count: number;
  scoreText: string;
  _id: string;
}

interface Result {
  title: string;
  count: number;
  score: number;
  facets: Facet[];
  _id: string;
}

interface User {
  _id: string;
  result: Result[];
  userId: string;
}

export default function UserData() {
  const [data, setData] = useState<User[]>([]);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const adminId = localStorage.getItem("adminId");
      const body = { _id: adminId };

      try {
        const response = await axios.post(
          "https://backend-three-eta-83.vercel.app/api/getUsersData",
          body
        );

        if (response.data?.msg === "success") {
          setData(response.data?.data);
        } else {
          console.error("Failed to fetch data: ", response.data?.msg);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleToggleUser = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
    setExpandedResultId(null); // Collapse results when changing users
  };

  const handleToggleResult = (resultId: string) => {
    setExpandedResultId(expandedResultId === resultId ? null : resultId);
  };

  return (
    <div style={{ padding: 24 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <React.Fragment key={user._id}>
                  <TableRow>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleToggleUser(user._id)}
                        style={{ textTransform: "none" }}
                      >
                        {expandedUserId === user._id
                          ? "Hide Details"
                          : "View Details"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Collapse in={expandedUserId === user._id}>
                        {user.result.map((result) => (
                          <div key={result._id} style={{ marginBottom: 16 }}>
                            <Typography variant="h6" gutterBottom>
                              <Button
                                onClick={() => handleToggleResult(result._id)}
                                style={{ textTransform: "none", width: "100%" }}
                              >
                                {result.title} (Score: {result.score})
                              </Button>
                            </Typography>
                            <Collapse in={expandedResultId === result._id}>
                              <Table size="small" aria-label="facets">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Facet</TableCell>
                                    <TableCell>Score</TableCell>
                                    <TableCell>Count</TableCell>
                                    <TableCell>Score Text</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {result.facets.map((facet) => (
                                    <TableRow key={facet._id}>
                                      <TableCell>{facet.title}</TableCell>
                                      <TableCell>{facet.score}</TableCell>
                                      <TableCell>{facet.count}</TableCell>
                                      <TableCell>{facet.scoreText}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Collapse>
                          </div>
                        ))}
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
