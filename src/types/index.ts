export * from './types'
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Goal{
   id?: number;
  title: string;
  description: string;
  dateStart?: Date;
  dateEnd?: Date;
}