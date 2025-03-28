
import React, { ReactNode, useState } from "react";

interface ButtonsGroups {
    children?: ReactNode;
    cols: number
}
export const ButtonGroups = ({ children, cols }: ButtonsGroups) => {
    return (

        <div className=" w-full h-16 max-w-lg bg-gradient border border-primary-200 rounded-full dark:border-primary-600">
            <div className={`grid h-full max-w-lg grid-cols-${cols} mx-auto`}>
                {children}
            </div>
        </div>


    )
}
