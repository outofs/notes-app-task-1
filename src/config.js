import { extractDates } from "./helper.js";

export const randomId = function () {
  return Math.floor(Math.random() * 99999);
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const notesObj = [
  {
    id: `${randomId()}`,
    created: "March 25, 2022",
    title: "Note 1",
    category: "Random Thought",
    content: "30/9/2022 - visiting doctor, 2/10/2022 - buy medicine",
    dates: extractDates(
      "30/9/2022 - visiting doctor, 2/10/2022 - buy medicine"
    ),
    archived: false,
  },
  {
    id: randomId(),
    created: "June 2, 2022",
    title: "Buy Coffe",
    category: "Task",
    content: "Buy coffe!!!!",
    dates: extractDates("Buy coffe!!!!"),
    archived: false,
  },
  {
    id: randomId(),
    created: "July 15, 2022",
    title: "Visit the theater",
    category: "Idea",
    content: "Visit the theater in 14.9.2022",
    dates: extractDates("Visit the theater in 14.9.2022"),
    archived: true,
  },
  {
    id: randomId(),
    created: "August 20, 2022",
    title: "Success is",
    category: "Quote",
    content:
      "Success is the ability to go from one failure to another with no loss of enthusiasm. Winston Churchill",
    dates: extractDates(
      "Success is the ability to go from one failure to another with no loss of enthusiasm. Winston Churchill"
    ),
    archived: false,
  },
  {
    id: randomId(),
    created: "September 17, 2022",
    title: "Notes App",
    category: "Task",
    content: "Finish this Notes App up to 29/09/2022",
    dates: extractDates("Finish this Notes App up to 29/09/2022"),
    archived: false,
  },

  {
    id: randomId(),
    created: "September 17, 2022",
    title: "Going through hell",
    category: "Quote",
    content: "If you are going through hell, keep going. Winston Churchill",
    dates: extractDates(
      "If you are going through hell, keep going. Winston Churchill"
    ),
    archived: true,
  },
];
