
export interface IStandard {
    id: number;
    name: string;
    description: string;
    sections: ISection[];
}

export interface ISection {
    id: number;
    name: string;
    description: string;
};