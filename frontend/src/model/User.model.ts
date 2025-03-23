class UserModel {
  id: string;
  name: string;
  title: string;
  role: string;
  isActive?: boolean;
  email: string;
  createdAt?: string;
  constructor(
    id: string,
    name: string,
    title: string,
    role: string,
    isActive: boolean,
    email: string,
    createdAt: string
  ) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.role = role;
    this.isActive = isActive;
    this.email = email;
    this.createdAt = createdAt;
  }
  static initial() {
    return {
      id: "",
      name: "",
      title: "",
      role: "",
      isActive: true,
      email: "",
      createdAt: "",
    };
  }
}
export { UserModel };
