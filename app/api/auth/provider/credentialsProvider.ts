import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsProvider = CredentialsProvider({
    name: "credentials",
    credentials: {},
    async authorize(credentials) {
        try {
            const { email, password } = credentials as {
                email: string,
                password: string,
            };

            const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            if (![200, 201].includes(res.status)) return null

            const response = await res.json();
            const profile = {
                ...response.data,
            }

            return profile;
        } catch (error) {
            return null;
        }


    },
})