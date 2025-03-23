export const formatDate = (date: Date) => {
  // Get the month, day, and year
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const year = date.toLocaleDateString("en-US", { year: "2-digit" });

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
export const formatDateTime = (date: Date) => {
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const year = date.toLocaleDateString("en-US", { year: "2-digit" });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDateTime = `${day}-${month}-${year} ${time}`;

  return formattedDateTime;
};
export function dateFormatter(dateString: string) {
  const inputDate = new Date(dateString);

  if (isNaN(Number(inputDate))) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitialsName(fullName: string): string {
  const words = fullName?.trim().split(/\s+/);
  if (words?.length < 2) return fullName?.substring(0, 2).toUpperCase();
  const lastTwoWords = words?.slice(-2);
  const initials = lastTwoWords?.map((word) => word[0].toUpperCase()).join("");

  return initials;
}
export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
  normal: "text-gray-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};
export const bgColor = {
  normal: "bg-gray-200",
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};
export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
  "bg-violet-700",
];
export const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];
export const LISTS: stageProps[] = ["todo", "in progress", "completed"];
export const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

export const errorMessage = (error: any) => {
  let message = "Lỗi kết nối. Vui lòng thử lại!";
  if (error.message !== undefined) {
    if (error.message.content !== undefined) {
      message = error.message.content;
    } else {
      message = error.message;
      if (error.error && error.error.message) {
        message += ". " + error.error.message;
      }
    }
  } else {
    if (error.code !== undefined) {
      message = error.code;
    } else {
      message =
        "Undefined error. Please try again later or contact the administrator";
    }
  }
  return message;
};
