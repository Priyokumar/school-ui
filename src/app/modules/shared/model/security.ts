
export interface IUser {
    id: Number
    userName: String
    firstName: String
    lastName: String
    email: String
    mobile: String
    roles: IRole[]
    linkedId: Number
    status: String
}

export interface IRole {
    id: String
    name: String
    desc: String
    menus: IMenu[]
}

export interface IMenu {
    id: Number
    order: Number
    path: String
    title: String
    icon: String
    hasSubmenu: Boolean
    submenu: IMenu[]
}

export const UserStatuses: String[] = [
    "Active",
    "Expired",
    "Inactive",
    "First time"
]
