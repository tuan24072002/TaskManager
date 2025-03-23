interface activitiesProps {
  type: string;
  activity: string;
  date: string;
  by: { id: string; name: string };
  id: string;
}
interface subTasksProps {
  title: string;
  date: string;
  tag: string;
  id: string;
}
interface taskProps {
  id?: string;
  title?: string;
  date?: string;
  priority?: string;
  stage: stageProps;
  assets?: string[];
  team?: userProps[];
  isTrashed?: boolean;
  activities?: activitiesProps[];
  subTasks?: subTasksProps[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
interface userProps {
  id: string;
  name: string;
  title: string;
  role: string;
  isActive?: boolean;
  email: string;
  createdAt?: string;
}
interface typeTaskProps {
  todo: number;
  "in progress": number;
  completed: number;
}
interface summaryProps {
  totalTasks: number;
  last10Task: taskProps[];
  users: userProps[];
  tasks: tasksProps;
}
interface graphDataProps {
  name: string;
  total: number;
}
type stageProps = "todo" | "in progress" | "completed";
type priorityProps = "normal" | "low" | "medium" | "high";
type actions =
  | "ALL"
  | "VIE"
  | "INS"
  | "UPD"
  | "DEL"
  | "UND"
  | "IMP"
  | "UNV"
  | "VER"
  | "WAI"
  | "CAN"
  | "DEN"
  | "PDF"
  | "APP"
  | "EXC"
  | "MSP"
  | "MBP"
  | "MWA"
  | "MSV"
  | "MDC"
  | "MRB"
  | "MRS"
  | "MCO"
  | "ISY"
  | "MPN"
  | "MGT"
  | "MCT"
  | "MPT"
  | "MSU"
  | "MWE"
  | "MST"
  | "MSW"
  | "VCP"
  | "MCP"
  | "MFP"
  | "MEW"
  | "MEH"
  | "MEN"
  | "MTA"
  | "MPI"
  | "VQT"
  | "VVL"
  | "MDA"
  | "MCU"
  | "MCN"
  | "MOD"
  | "MCI"
  | "MPH"
  | "MPV"
  | "MDT"
  | "MWD"
  | "MAD"
  | "MTG"
  | "MWH"
  | "MVA"
  | "MNO"
  | "DVE"
  | "CVE"
  | "WLQ"
  | "DLQ"
  | "LIQ"
  | "CLQ"
  | "DRE"
  | "RED"
  | "CRE"
  | "MDL"
  | "MDR"
  | "VTA"
  | "MTD"
  | "MDD"
  | "VBR"
  | "VSR"
  | "VPTP"
  | "VGP"
  | "VTP"
  | "VRP";
type chartType = "Bar" | "Line" | "Area" | "Pie";
interface ChatProps {
  time: string;
  text: string;
  sender: SenderProps;
  receiver?: ReceiverProps;
  socketRoom?: string;
  userId?: string;
}
type SenderProps = "user" | "model" | "support";
type ReceiverProps = "user" | "model" | "support";
type TypingInfoProps = {
  isTyping: boolean;
  sender: SenderProps | null;
  userId: string | null;
};
