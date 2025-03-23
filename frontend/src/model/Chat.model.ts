class ChatModel {
  time: string;
  text: string;
  sender: SenderProps;
  constructor(time: string, text: string, sender: SenderProps) {
    this.time = time;
    this.text = text;
    this.sender = sender;
  }
  static initial() {
    return {
      time: "",
      text: "",
      sender: "user" as SenderProps,
    };
  }
}
export { ChatModel };
