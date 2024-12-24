export interface MenuLink {
    sections: string;
    id: number;
    nameURL: string;
    title: string;
    canBeModified: boolean;
    canBeDeleted: boolean;
    showInNavigation: boolean;
    showInFooter: boolean;
}
