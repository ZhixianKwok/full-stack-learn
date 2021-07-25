import React from 'react';

interface TotalProps {
    exerciseCount:number
}

const Total = (props:TotalProps) => {
    return (
        <div>
             <p>
                Number of exercises{" "}
                {props.exerciseCount}
            </p>
        </div>
    )
}

export default Total
