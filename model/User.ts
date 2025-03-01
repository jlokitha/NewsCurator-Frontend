class User {
    username?: string;
    email: string;
    password: string;
    createdAt?: string;

    constructor(username: string, email: string, password: string, createdAt: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}

export default User;