import type { GENDER_PREFERENCE } from "./constants";
import { ReactNode } from "react";

import {
    IoFemaleOutline as FemaleIcon, 
    IoMaleOutline as MaleIcon,
    IoMaleFemaleOutline as FemaleMaleIcon
} from "react-icons/io5";

export const genderPreferenceWithIcon: Record<GENDER_PREFERENCE, ReactNode> = {
    "Female Only" : <FemaleIcon />,
    "Male Only" : <MaleIcon />,
    "Both": <FemaleMaleIcon /> 
}