import React from 'react';
import CoursePart from '../types/types';

interface PartProps {
    coursePart:CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
);
};

function Part(props:PartProps) {

    let comp = null;
    switch (props.coursePart.type) {
        case "normal":
            comp = <div>
                {props.coursePart.description}
            </div>
            break;
        case "groupProject":
            comp = <div>
                {props.coursePart.name}
            </div>
            break;

        case "submission":
            comp = <div>
                {props.coursePart.exerciseSubmissionLink}
            </div>
            break;
        default:
            assertNever(props.coursePart);
            break;
    }

    return comp;
}

export default Part
