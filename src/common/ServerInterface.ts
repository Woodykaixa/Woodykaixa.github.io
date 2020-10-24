/**
 * 服务器响应基本格式
 */
export interface ServerResponse {
    err: number,
    data: string | Array<any> | object | any
}

export interface LoginResponse extends ServerResponse {
    data: string
}

export interface RegisterResponse extends ServerResponse {
    data: string
}

export interface WhoAmIResponse extends ServerResponse {
    data: {
        username: string | null
    }
}

export interface RepoLink {
    title: string,
    link: string,
    description: string,
    fork: number,
    star: number,
    language: string,
    isForked: boolean
}

export interface AdminProfileData {
    name: string,
    "company": string,
    "github": string,
    "blog": string,
    "location": string,
    "bio": string,
    "loginName": string,
    "repoCount": number,
    "followers": number,
    "following": number,
    repos: RepoLink[]
}

export interface AdminProfileResponse extends ServerResponse {
    data: AdminProfileData | string;
}