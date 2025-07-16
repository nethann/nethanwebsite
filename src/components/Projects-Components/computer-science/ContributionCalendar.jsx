import React, { useEffect, useState } from "react";
import "../../../CSS/Projects/ComputerScience/ContributionCalendar.css";

export default function ContributionCalendar() {
  const [days, setDays] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getColor = (count) => {
    if (count === 0) return "#0d1117"; // Background color
    if (count < 2) return "#39d353"; // Light green
    if (count < 5) return "#26a641"; // Medium green
    if (count < 8) return "#006d32"; // Darker green
    return "#0e4429"; // Darkest green
  };

  useEffect(() => {
    fetch("https://nethan-github-api.onrender.com/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const flatDays = data.weeks.flatMap((week) => week.contributionDays);
        setDays(flatDays);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading GitHub info");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="status-message">Loading GitHub contributions...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  return (
    <div className="contrib-calendar">
      {days.map((day, index) => (
        <div
          key={index}
          title={`${day.contributionCount} contribution${
            day.contributionCount !== 1 ? "s" : ""
          } on ${new Date(day.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}
          style={{ backgroundColor: getColor(day.contributionCount) }}
          className="contrib-day"
        ></div>
      ))}
    </div>
  );
}
