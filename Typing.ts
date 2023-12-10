export interface tabsInterface {
  map(
    arg0: (item: any) => import('react').JSX.Element,
  ): import('react').ReactNode;
  title: string;
  content: () => React.JSX.Element;
}
export type TitlesType = {
  title: string;
  onClick: (item: any) => void;
  key?: number;
  image?: string;
  activeTile: string;
  id: string;
};
export type imageCardType = {
  id: any;
  imgURL: string;
  text: string;
  index: number;
};

export interface CatMstDataReadType {
  id: number;
  collectionId: any;
  title: any;
  img_path: any;
}
